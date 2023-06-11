import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PayMent from "./Pages/PayMentPage";
import Web3 from "web3";
let web3= new Web3(window.ethereum)

// const Web3 = require("web3");

let defaultWalletAddress
let smartContractAddress_contractList


await web3.eth.net.getId().then(data => {
  data = parseInt(data)
  // console.log(data)
  if(parseInt(data) === 5777){
    defaultWalletAddress = "0x00e2DcE6e15BC5612a3EB5242CaC4c71672c6b29".toLowerCase();
    smartContractAddress_contractList = "0x8E1a4505ebc24f1f413F93FeAa51Df4799D4dA0f".toLowerCase();
  }
  else if(parseInt(data) === 11155111){
    defaultWalletAddress = "0x232eeF1a243BC60642570ab7535c5c7cD2Aa1314".toLowerCase();
    smartContractAddress_contractList = "0x78117C4E960e942340a32F415FAB6676CFc856E7".toLowerCase();
  }
});

class App extends Component {
  
  render() {
  return (
    <div>
    <Routes>
      <Route path="/" element={
        <HomePage
          defaultWalletAddress={defaultWalletAddress}
          smartContractAddress_contractList={smartContractAddress_contractList}
        />} />
      <Route path="/payment" element={
        <PayMent 
          defaultWalletAddress={defaultWalletAddress}
          smartContractAddress_contractList={smartContractAddress_contractList}
        />
      } />
      <Route path="/add_post/payment" element={
        <PayMent 
          billItemName={"訂金"}
          defaultWalletAddress={defaultWalletAddress}
          smartContractAddress_contractList={smartContractAddress_contractList}
        />
      } />
    </Routes>
    </div>
    );
  }
}

  export default App;