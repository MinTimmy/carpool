import './css/AddPostAndOrder.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Web3 from "web3";
// const Web3 = require('web3');


function OrderItem(props) {
    // console.log('OrderItem',props);
    return (
        <>
            <div className='item'>
                <div className='item_left'>
                    <h2 className='num'>Have a</h2>
                    <p className='day'>nice day</p>
                    <span className='up-border'></span>
                    <span className='down-border'></span>
                </div>

                <div className='item_right'>
                    <p className='event'>共乘-比特幣支付</p>
                    <h2 className='title'>
                        <i className='fa fa-map-marker'></i>{props.departure_detail}→{props.destination_detail}
                    </h2>

                    <div className='sce'>
                        <div className='icon'>
                            <i className='fa fa-table'></i>
                        </div>
                        <p>
                        {props.time}
                        </p>
                    </div>
                    <div className='fix'></div>
                    <div className='ticket_price'>
                        <div className='icon'>
                            <i className='fa-brands fa-bitcoin'></i>
                        </div>
                        <p>{props.price} ETH</p>
                    </div>
                    <div className='ticket_price'>
                        {props.youAreDriver ? "你是司機" : "你是乘客"}
                    </div>
                    <div className='fix'></div>
                    <div className='ticket_price'>
                        balance: {Web3.utils.fromWei(props.balance, 'ether')} ETH
                    </div>
                    <div className='fix'></div>
                </div>
                {/* <div className='tickets'>
                    <a className='tickets_btn' href='/'>
                        退費
                    </a>
                </div> */}
                <div className='tickets'>
                    <Link to="/payment"
                        state={{
                            type: props.youAreDriver ? "driver_reward" : "customer_refund",
                            smartContractAddress: props.contractAddress,
                            departure_county:props.departure_county,
                            destination_county:props.destination_county,
                            departure_detail:props.departure_detail,
                            destination_detail:props.destination_detail,
                            time:props.time,
                            price:props.price,
                            driver_information:{
                                license_plate:props.license_plate,
                                car_model:props.car_model,
                                remain_person:props.remain_person
                            },
                            walletAddress: props.walletAddress,
                    }}
                    >{props.youAreDriver ? "領錢" : "退費"}</Link> :

                </div>

            </div>
        </>
    );
}

export default OrderItem;
