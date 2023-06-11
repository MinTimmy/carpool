import "./css/PostCard.css";
import { Link } from 'react-router-dom';
import Web3 from "web3";
// const Web3 = require('web3');

export default function PostCard(props){
    return (
        <div className="post_card" key={props.id}>
              {/* <h3>12 January 2019</h3> */}
              <h3>{props.time}</h3>
              <h1>{props.departure_county}→{props.destination_county} {props.walletAddress.toLowerCase() === props.driverAddress.toLowerCase() && "你是司機"}</h1>
              <table>
                <tbody>
                <tr>
                    <th>出發地：</th>
                    <td>{props.departure_detail}</td>
                </tr>
                <tr>
                    <th>目的地：</th>
                    <td>{props.destination_detail}</td>
                </tr>
                <tr>
                    <th>行程價碼：</th>
                    <td>${props.price}</td>
                </tr>
                <tr>
                    <th>剩餘人數：</th>
                    <td>{props.remain_person}</td>
                </tr>
                <tr>
                    <th>Balance</th>
                    <td>{Web3.utils.fromWei(props.balance, 'ether')} ETH</td>
                </tr>
                
                </tbody>
            </table>
            {
                props.remain_person !== "0" && <Link to="/payment"
                    state={{
                        type: "find_driver",
                        // id:uniqueId,
                        departure_county:props.departure_county,
                        destination_county:props.destination_county,
                        departure_detail:props.departure_detail,
                        destination_detail:props.destination_detail,
                        time:props.time,
                        price:props.price,
                        driver_information:{
                            // driverAddress: props.driverAddress,
                            license_plate:props.license_plate,
                            car_model:props.car_model,
                            remain_person:props.remain_person
                        },
                        walletAddress: props.walletAddress,
                        smartContractAddress: props.smartContractAddress,
                        // contractList_contract: props.contractList_contract
                        smartContractAddress_contractList: props.smartContractAddress_contractList,
                    }} 
                    className="btn_primary" >我要預約</Link>
            }
            {/* <a className="btn_primary" href='/payment' target="_blank">我要預約</a> */}
        </div>
    ); 
}