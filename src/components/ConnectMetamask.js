import React from "react";
import './css/ConnectMetamask.css'
// import PostItems from "../data/postItem";
import PostCard from "../components/PostCard";
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
// const abi_BookingCar = require("../abi/BookingCar_Ganache.js");

const currentDate = new Date();
const currentTimestamp = currentDate.getTime();

let PostItems = [];
export default function ConnectMetamask(props) {
  // let web3 = new Web3(window.ethereum)
  // web3.eth.net.getId().then(data => console.log("Network ID:", data));
  React.useEffect(() => {
    
    getCurrentWalletConnected();
    addWalletListener();
    getBookingCarAddress();
  }, []);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        props.setWalletAddress(accounts[0].toLowerCase());
        // web3 = new Web3(window.ethereum) 
        // props.web3.setProvider(window.ethereum);
        web3.setProvider(window.ethereum);
        props.setWhetherConnectMetamask(true)
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          props.setWalletAddress(accounts[0].toLowerCase());
        } else {
          // console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        props.setWalletAddress(accounts[0].toLowerCase());
        web3.setProvider(window.ethereum);
      });
    } else {
      /* MetaMask is not installed */
      props.setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

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

  const getBookingCarAddress = async () => {
    // console.log("ConnectMetamask.js", props.smartContractAddress_contractList)
    let contractList_contract = new web3.eth.Contract(
      abi_contractList, 
      props.smartContractAddress_contractList,
      {from: props.walletAddress}
    );
    PostItems = []
    let res = await contractList_contract.methods.listAllContract().call().then((data) => data);
    let contractList = res[0]
    // console.log(contractList)
    for(let i = 0; i < contractList.length; i++){
      // check = true
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
      // let validContract = await contract.methods.validContract.call().call().then((data) => data);
      let departureTime = await contract.methods.departureTime.call().call().then((data) => data);
      departureTime = parseInt(departureTime)
      if (departureTime * 1000 < currentTimestamp){
        continue
      }
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
      // let customerAddress = await contract.methods.getCustomerAddress().call().then((data) => data);
      
        
      remainingNumber = parseInt(remainingNumber)
      
      // if(check != i)
      PostItems.push({
        type: "find_customer",
        id: PostItems.length+1,
        departure_county: location,
        destination_county: destination,
        departure_detail: departureDetail,
        destination_detail: destinationDetail,
        time: convertTime(departureTime * 1000),
        price: Web3.utils.fromWei(price.toString(), 'ether'),
        driver_information: {
          driverAddress: driverAddress,
          license_plate: licensePlate,
          car_model: carAppearance,
          remain_person: remainingNumber
        },
        smartContractAddress: contractList[i],
        balance: balance,
      })
      // check = i
    }
  }

  return (
    <div className="connect_container">
      {
        !props.whetherConnectMetamask ?
          <>
            <button className="connect_btn" onClick={connectWallet}>Connect to MetaMask</button>
            <p>Connect to MetaMask using the Connect button</p>
          </> :
          <>
            <p>Current Wallet Address: ${props.walletAddress}</p>
            <div className="post_card_wrap">
            {
            PostItems.map(postItem => (
                <PostCard 
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
                walletAddress={props.walletAddress} // The user's active address.
                smartContractAddress={postItem.smartContractAddress}
                // contractList_contract={contractList_contract}
                smartContractAddress_contractList={props.smartContractAddress_contractList}
                // web3={props.web3}
                driverAddress={postItem.driver_information.driverAddress}
                balance={postItem.balance}
            />
            ))
            }
            </div>
          </>
      }
    </div>
  );
}