import './css/AddPostAndOrder.css';
import React from 'react';
import OrderItem from './OrderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList } from '@fortawesome/free-solid-svg-icons'
import Web3 from "web3";

const abi_contractList = require("../abi/ContractList.js");
let abi_BookingCar
let web3= new Web3(window.ethereum)

web3.eth.net.getId().then(data => {
  data = parseInt(data)
  // console.log(data)
  if(parseInt(data) === 5777){
    abi_BookingCar = require("../abi/BookingCar_Ganache.js");
  }
  else if(parseInt(data) === 11155111){
    abi_BookingCar = require("../abi/BookingCar_Sepolia.js");
  }
});

function Order(props) {
  

  const [postItems, setPostItems] = React.useState(null);

  React.useEffect(() => {
    getOrderList();
  }, [props.walletAddress]);
//   getOrderList()
  const convertTime = (date) => {
    date = parseInt(date);
    date = new Date(date);

    const padTo2Digits = (num) => {
      return num.toString().padStart(2, '0');
    }
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  const getOrderList = async () => {
    let contractList_contract = new web3.eth.Contract(
      abi_contractList, 
      props.smartContractAddress_contractList,
      {from: props.walletAddress}
    );

    let contractList = await contractList_contract.methods.findContract_customer(props.walletAddress).call().then((data) => data);
    let customerListLength = contractList.length
    contractList = contractList.concat(await contractList_contract.methods.findContract_driver(props.walletAddress).call().then((data) => data));

    // console.log("contractList", contractList)
    let _postItems = []
    for(let i = 0; i < contractList.length; i++){
      
      if(contractList[i] === "0x0000000000000000000000000000000000000000") continue
      var contract = await new web3.eth.Contract(
        abi_BookingCar, 
        contractList[i],
        {from: props.walletAddress}
      );
      let balance = await contract.methods.getBalance().call().then((data) => data);
      balance = parseInt(balance)
      // console.log(balance)
      if (balance === 0){
        continue
      }
      let departureTime = await contract.methods.departureTime.call().call().then((data) => data);
      let location = await contract.methods.location.call().call().then((data) => data);
      let destination = await contract.methods.destination.call().call().then((data) => data);
      let price = await contract.methods.price.call().call().then((data) => data);
      let remainingNumber = await contract.methods.remainingNumber.call().call().then((data) => data);
      // let totalNumber = await contract.methods.totalNumber.call().call().then((data) => data);
      let licensePlate = await contract.methods.licensePlate.call().call().then((data) => data);
      let carAppearance = await contract.methods.carAppearance.call().call().then((data) => data);
      let departureDetail = await contract.methods.departureDetail.call().call().then((data) => data);
      let destinationDetail = await contract.methods.destinationDetail.call().call().then((data) => data);

      let driverAddress = await contract.methods.getDriverAddress().call().then((data) => data);
      departureTime = parseInt(departureTime)

      // let customerAddress = await contract.methods.getCustomerAddress().call().then((data) => data);

    _postItems.push({
        type: "find_customer",
        id: _postItems.length+1,
        departure_county: location,
        destination_county: destination,
        departure_detail: departureDetail,
        destination_detail: destinationDetail,
        time: convertTime(departureTime * 1000),
        price: Web3.utils.fromWei(price.toString(), 'ether'),
        driver_information: {
          youAreDriver: i < customerListLength ? false : true,
          driverAddress: driverAddress,
          license_plate: licensePlate,
          car_model: carAppearance,
          remain_person: remainingNumber
        },
        contractAddress: contractList[i],
        balance: balance,
    })
    
    }
    setPostItems(_postItems)
  }
  return (
    <>
      {/* fixed_button */}
      <a className='order_btn' href='#order_modal'>
        <p>訂單</p>
        <FontAwesomeIcon icon={faRectangleList} size='xl'/>                
      </a>
      {/* Order */}
      <div id='order_modal' className='modal'>
        <div className='modal__content'>
          <a href='/' className='modal__close'>
            &times;
          </a>
          <h1>查看訂單</h1>
          {
            postItems ?
            postItems.map(postItem => (
              <OrderItem 
                key={postItem.id}
                type={postItem.type}
                departure_county={postItem.departure_county}
                destination_county={postItem.destination_county}
                departure_detail={postItem.departure_detail}
                destination_detail={postItem.destination_detail}
                time={postItem.time}
                price={postItem.price}
                license_plate={postItem.driver_information.license_plate}
                car_model={postItem.driver_information.car_model}
                remain_person={postItem.driver_information.remain_person}
                contractAddress={postItem.contractAddress}
                walletAddress={props.walletAddress}
                driverAddress={postItem.driver_information.driverAddress}
                youAreDriver={postItem.driver_information.youAreDriver}
                balance={postItem.balance}
              />
            )) : ""
          }
        </div>
      </div>
    </>
  );
}

export default Order;
