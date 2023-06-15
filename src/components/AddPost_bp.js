import './css/AddPostAndOrder.css';
import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function AddPost(props) {
    const [departureCounty, setDepartureCounty] = useState('');
    const [destinationCounty, setDestinationCounty] = useState('');
    const [departureDetail, setDepartureDetail] = useState('');
    const [destinationDetail, setDestinationDetail] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [remainPerson, setRemainPerson] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [carModel, setCarModel] = useState('');

    return (
        <>
            {/* fixed_button */}
            <a className='add_post_btn' href='/#add_post'>
                <p>po文</p>
                <FontAwesomeIcon icon={faPenToSquare} size='xl'/>  
            </a>
            {/* Add Post*/}
            <div id='add_post' className='modal'>
                <div className='modal__content'>
                    <div className='add_post_container'>
                        <input type='checkbox' id='chk' aria-hidden='true' />

                        <div className='find_customers'>
                        <form>
                                <label htmlFor='chk' aria-hidden='true'>
                                    我要找乘客
                                </label>
                                <input type='' name='time' placeholder='乘車時間' required onChange={e=>setTime(e.target.value)} />
                                <div className='dropdown_select'>
                                    <select value={departureCounty} onChange={e=>setDepartureCounty(e.target.value)}>
                                        <option>出發縣市:</option>
                                        <option value='基隆市'>基隆市</option>
                                        <option value='台北市'>台北市</option>
                                        <option value='新北市'>新北市</option>
                                        <option value='桃園縣'>桃園縣</option>
                                        <option value='新竹市'>新竹市</option>
                                        <option value='新竹縣'>新竹縣</option>
                                        <option value='苗栗縣'>苗栗縣</option>
                                        <option value='台中市'>台中市</option>
                                        <option value='彰化縣'>彰化縣</option>
                                        <option value='南投縣'>南投縣</option>
                                        <option value='雲林縣'>雲林縣</option>
                                        <option value='嘉義市'>嘉義市</option>
                                        <option value='嘉義縣'>嘉義縣</option>
                                        <option value='台南市'>台南市</option>
                                        <option value='高雄市'>高雄市</option>
                                        <option value='屏東縣'>屏東縣</option>
                                        <option value='台東縣'>台東縣</option>
                                        <option value='花蓮縣'>花蓮縣</option>
                                        <option value='宜蘭縣'>宜蘭縣</option>
                                        <option value='澎湖縣'>澎湖縣</option>
                                        <option value='金門縣'>金門縣</option>
                                        <option value='連江縣'>連江縣</option>
                                    </select>
                                </div>
                                <input
                                    type='departure'
                                    name='departure'
                                    placeholder='出發地'
                                    required onChange={e=>setDepartureDetail(e.target.value)}
                                />
                                <div className='dropdown_select'>
                                <select value={destinationCounty} onChange={e=>setDestinationCounty(e.target.value)}>
                                        <option>目的縣市:</option>
                                        <option value='基隆市'>基隆市</option>
                                        <option value='台北市'>台北市</option>
                                        <option value='新北市'>新北市</option>
                                        <option value='桃園縣'>桃園縣</option>
                                        <option value='新竹市'>新竹市</option>
                                        <option value='新竹縣'>新竹縣</option>
                                        <option value='苗栗縣'>苗栗縣</option>
                                        <option value='台中市'>台中市</option>
                                        <option value='彰化縣'>彰化縣</option>
                                        <option value='南投縣'>南投縣</option>
                                        <option value='雲林縣'>雲林縣</option>
                                        <option value='嘉義市'>嘉義市</option>
                                        <option value='嘉義縣'>嘉義縣</option>
                                        <option value='台南市'>台南市</option>
                                        <option value='高雄市'>高雄市</option>
                                        <option value='屏東縣'>屏東縣</option>
                                        <option value='台東縣'>台東縣</option>
                                        <option value='花蓮縣'>花蓮縣</option>
                                        <option value='宜蘭縣'>宜蘭縣</option>
                                        <option value='澎湖縣'>澎湖縣</option>
                                        <option value='金門縣'>金門縣</option>
                                        <option value='連江縣'>連江縣</option>
                                    </select>
                                </div>
                                <input
                                    type='destination'
                                    name='destination'
                                    placeholder='目的地'
                                    required onChange={e=>setDestinationDetail(e.target.value)}
                                />
                                <input
                                    type='price'
                                    name='price'
                                    placeholder='行程價碼'
                                    required onChange={e=>setPrice(e.target.value)}
                                />
                                <input
                                    type='remain_person'
                                    name='remain_person'
                                    placeholder='載客人數'
                                    required onChange={e=>setRemainPerson(e.target.value)}
                                />
                                <p>車牌及車型 將會在乘客訂購完成時提供</p>
                                <input
                                    type='license_plate'
                                    name='license_plate'
                                    placeholder='車牌'
                                    required onChange={e=>setLicensePlate(e.target.value)}
                                />
                                <input
                                    type='car_shape'
                                    name='car_shape'
                                    placeholder='車型外觀'
                                    required onChange={e=>setCarModel(e.target.value)}
                                />
                                <Link to="/add_post/payment"
                                    state={{
                                        type: "find_customer",
                                        id:null,
                                        departure_county:"台中",
                                        destination_county:"台北",
                                        departure_detail:"台中火車站",
                                        destination_detail:"台北轉運站",
                                        time:"2023-07-25 12:00:00",
                                        price:"0.00000000000001",
                                        // price:"0.01",
                                        driver_information:{
                                            license_plate:"CBA-7777",
                                            car_model:"Discovery Sport 白",
                                            remain_person:"3",
                                            total_person:"3"
                                        },
                                        // walletAddress: props.walletAddress,
                                        // id:null,
                                        // departure_county:departureCounty,
                                        // destination_county:destinationCounty,
                                        // departure_detail:departureDetail,
                                        // destination_detail:destinationDetail,
                                        // time:time,
                                        // price:price,
                                        // driver_information:{
                                        //     license_plate:licensePlate,
                                        //     car_model:carModel,
                                        //     remain_person:remainPerson,
                                        //     total_person:remainPerson
                                        // },
                                        walletAddress: props.walletAddress,
                                 }} className="addPost_btn" >發文</Link>
                            </form>
                        </div>
                    </div>
                    <a href='/' className='modal__close'>
                        &times;
                    </a>
                </div>
            </div>
        </>
    );
}

export default AddPost;
