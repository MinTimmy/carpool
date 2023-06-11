import React from "react";
import Web3 from "web3";
import "./css/HomePage.css";
// import PostItems from "../data/postItem";
import banner from './img/pay.png';

import AddPost from "../components/AddPost";
import Order from "../components/Order";
import ConnectMetamask from "../components/ConnectMetamask";

// const Web3 = require('web3');

export default function HomePage(props) {
    //ConnectMetamask
    const [walletAddress, setWalletAddress] = React.useState(props.defaultWalletAddress); // the wallet address user login
    const [whetherConnectMetamask, setWhetherConnectMetamask] = React.useState(false); // check that user whether login to the metamask 

    return (
        <>
            {/* banner */}
            <div className="banner">
                <h1>共乘系統</h1>
                <img src={banner} alt="banner" className="banner_img"/>
            </div>

            <ConnectMetamask
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
                whetherConnectMetamask={whetherConnectMetamask}
                setWhetherConnectMetamask={setWhetherConnectMetamask}
                smartContractAddress_contractList={props.smartContractAddress_contractList}
            />

            {whetherConnectMetamask && <AddPost
                walletAddress={walletAddress}
            /> }
            {whetherConnectMetamask && 
                <Order 
                    walletAddress={walletAddress}
                    smartContractAddress_contractList={props.smartContractAddress_contractList}
                /> 
            }
        </>
    );
}