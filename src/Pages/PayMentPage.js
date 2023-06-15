// import { useEffect, useState } from "react";
import React from "react";
import "./css/PayMentPage.css";
import PayImg from './img/pay.png'
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Web3 from "web3";

let abi_BookingCar
let bytecode_BookingCar
let web3= new Web3(window.ethereum)

await web3.eth.net.getId().then(data => {
  data = parseInt(data)
  console.log(data)
  if(parseInt(data) === 5777){
    console.log("hello 0")
    bytecode_BookingCar = require("../bytecode/BookingCar_Ganache.js");
    abi_BookingCar = require("../abi/BookingCar_Ganache.js");

  }
  else if(parseInt(data) === 11155111){
    bytecode_BookingCar = require("../bytecode/BookingCar_Sepolia.js");
    abi_BookingCar = require("../abi/BookingCar_Sepolia.js");
  }
});

function PayMentPage(props) {
  const postItem = useLocation().state;
  const [sendStatus, setSendStatus] = React.useState(false)
  const [driverSendFee, setDriverSendFee] = React.useState(false)
  const [txHash, setTxHash] = React.useState(null)

  ;

  React.useEffect(() => {
    setSendStatus(false)
    setTxHash(null)
  }, [])
  
  const makeNewOrder = async () => {
    const contract = new web3.eth.Contract(abi_BookingCar);

    let localeTime = new Date(postItem.time).getTime();
    const deployTx = contract.deploy(
      {
      data: bytecode_BookingCar,
      arguments:[
        localeTime / 1000,
        postItem.departure_county,// "台中",// string memory _loaction,
        postItem.destination_county,// "台北",// string memory _destination,
        Web3.utils.toWei(postItem.price, 'ether'),// Web3.utils.toWei("0.01", 'ether'),// uint256 _price,
        postItem.driver_information.total_person,// 3,// uint256 _totalNumber,
        postItem.driver_information.license_plate,// "CBA-7777",// string memory _lincensePlate,
        postItem.driver_information.car_model,// "Discovery Sport 白",// string memory _carAppearance
        postItem.departure_detail,// "台中火車站",
        postItem.destination_detail,// "台北轉運站",
        // localeTime / 1000,
        // "台中",// string memory _loaction,
        // "台北",// string memory _destination,
        // Web3.utils.toWei(postItem.price, 'ether'),// Web3.utils.toWei("0.01", 'ether'),// uint256 _price,
        // 3,// uint256 _totalNumber,
        // "CBA-7777",// string memory _lincensePlate,
        // "Discovery Sport 白",// string memory _carAppearance
        // "台中火車站",
        // "台北轉運站",
      ]
    }
    );
    console.log("hello 2")
    const deployedContract = await deployTx
      .send({
        from: postItem.walletAddress,
        // gas: await deployTx.estimateGas(),
      })
      .once("transactionHash", (_txhash) => {
        console.log(`Mining deployment transaction ...`);
        console.log("txhash", _txhash)
        // console.log(`https://${network}.etherscan.io/tx/${txhash}`);
        // setSendStatus(true)
        setTxHash(_txhash)
      });
    // The contract is now deployed on chain!
    console.log(`Contract deployed at ${deployedContract.options.address}`);
    postItem.smartContractAddress = deployedContract.options.address
    console.log(
      `Add DEMO_CONTRACT to the.env file to store the contract address: ${deployedContract.options.address}`
    );
    await sendMoney();
  }

  const customerRefund = async () => {
    const contract = new web3.eth.Contract(
      abi_BookingCar,
      postItem.smartContractAddress,
      {from:postItem.walletAddress}
    );
    await contract.methods.refund().send({from:postItem.walletAddress});
    setSendStatus(true)

  }

  const toWei = (_price, _time) => {
    return (parseInt(web3.utils.toWei(_price, 'ether'))* _time).toString(16)
  }
  const sendMoney = async () => {
    await window.ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: postItem.walletAddress, // The user's active address.
          to: postItem.smartContractAddress, // Required except during contract publications.
          value: postItem.type === "find_customer" ? toWei(postItem.price, 0.1) : toWei(postItem.price, 1.1), // Only required to send ether to the recipient from the initiating external account.
        },
      ],
    })
    .then(async (_txHash) => {
      // console.log(_txHash)
      setTxHash(_txHash)
      setSendStatus(true)
      // setDriverSendFee()
    })
    .catch((error) => console.error("error", error));
  }
  const driverRewarding = async () => {
    const contract = new web3.eth.Contract(
      abi_BookingCar,
      postItem.smartContractAddress,
      {from:postItem.walletAddress}
    );
    await contract.methods.driverRewarding().send({from:postItem.walletAddress});
    setSendStatus(true)
  }

    return (
        <div className="model">
        <div className="room">
          <img src={PayImg} alt=""/>
          <div className="text_cover">
            <h1>{postItem.departure_detail}<span>→</span>{postItem.destination_detail}</h1>
            <hr/>
            <p>{postItem.time}</p>
          </div>
          <div className="text_cover_2">
              <h1>司機資訊</h1>
              <hr/>
              <table>
                <tbody>
                  <tr>
                      <th>車牌：</th>
                      <td>{postItem.driver_information.license_plate}</td>
                  </tr>
                  <tr>
                      <th>外觀：</th>
                      <td>{postItem.driver_information.car_model}</td>
                  </tr>
                  </tbody>
              </table>
            </div>
        </div>
        <div className="payment">
          <div className="receipt-box">
            <h3>帳單</h3>
            <table className="table">
              <tbody>
                <tr>
                  {/* <td>{props.billItemName}</td> */}
                  <td>車資</td>
                  {
                    useLocation().pathname === '/payment' ?
                    <td>{postItem.price} ETH</td>:
                    <td>{postItem.price} ETH</td>
                  }
                </tr>
                <tr>
                  {/* <td>{props.billItemName}gas</td> */}
                  <td>服務費</td>
                  {
                    useLocation().pathname === '/payment' ?
                    <td>{postItem.price*0.1} ETH</td>:
                    <td>{postItem.price*0.1} ETH</td>
                  }
                </tr>
                  <tr>
                    <td>總金額</td>
                    {
                      useLocation().pathname !== '/add_post/payment' ?
                      <td>{(postItem.price*0.1).toFixed(17)} ETH</td> :
                      postItem.type === "customer_refund" ?
                      <td>{(postItem.price*0.9).toFixed(17)} ETH</td>:
                      <td>{(postItem.price*1.1).toFixed(17)} ETH</td>
                    }                  
                  </tr>
                </tbody>
            </table>
          </div>
          <div className="payment-info">
            <h3>{postItem.type === "customer_refund" ? "退款資訊" : "付款資訊"}</h3>
            {postItem.type === "find_customer" && (sendStatus   ? "已繳手續費": "尚未繳手續費")}

              <div className="btn_group">
                {/* {txHash && <p>txHash: {txHash}</p>} */}

                <Link to="/" className="cancel_btn">取消</Link>
                {
                  sendStatus ?
                    <Link to="/" className="confirm_btn">返回</Link> :
                    postItem.type === "customer_refund"  ? 
                      <button onClick={customerRefund} className="confirm_btn">確認customerRefund</button> :
                    postItem.type === "find_customer" ? 
                      <button onClick={makeNewOrder} className="confirm_btn">確認makeNewOrder</button> :
                    postItem.type === "driver_reward" ?
                      <button onClick={driverRewarding} className="confirm_btn">確認driverReward</button> :
                      <button onClick={sendMoney} className="confirm_btn">確認sendMoney</button>
                      // console.log(postItem.type)
                }
                
              </div>
          </div>
        </div>
      </div>
    );
}

export default PayMentPage;