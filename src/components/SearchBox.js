import "./css/SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ serverSelect, setServerSelect }) {
    // const [serverSelect, setServerSelect] = useState('');
    const [departureSelect, setDepartureSelect] = useState('');
    const [destinationSelect, setDestinationSelect] = useState('');
    // console.log('serverSelect:',serverSelect);
    // console.log('departureSelect:',departureSelect);
    // console.log('destinationSelect:',destinationSelect);

    return (
        <div className="search_wrap">
            <div className="dropdown_select">
                <select value={serverSelect} onChange={e=>setServerSelect(e.target.value)}>
                    <option>選擇服務：</option>
                    <option value="find_driver">找司機</option>
                    <option value="find_customer">找乘客</option>
                </select>
            </div>

            <div className="dropdown_select">
                <select value={departureSelect} onChange={e=>setDepartureSelect(e.target.value)}>
                    <option>出發縣市:</option>
                    <option value="1">基隆市</option>
                    <option value="2">台北市</option>
                    <option value="3">新北市</option>
                    <option value="4">桃園縣</option>
                    <option value="5">新竹市</option>
                    <option value="6">新竹縣</option>
                    <option value="7">苗栗縣</option>
                    <option value="8">台中市</option>
                    <option value="9">彰化縣</option>
                    <option value="10">南投縣</option>
                    <option value="11">雲林縣</option>
                    <option value="12">嘉義市</option>
                    <option value="13">嘉義縣</option>
                    <option value="14">台南市</option>
                    <option value="15">高雄市</option>
                    <option value="16">屏東縣</option>
                    <option value="17">台東縣</option>
                    <option value="18">花蓮縣</option>
                    <option value="19">宜蘭縣</option>
                    <option value="20">澎湖縣</option>
                    <option value="21">金門縣</option>
                    <option value="22">連江縣</option>
                </select>
            </div>

            <div className="dropdown_select">
                <select value={destinationSelect} onChange={e=>setDestinationSelect(e.target.value)}>
                    <option>目的縣市:</option>
                    <option value="1">基隆市</option>
                    <option value="2">台北市</option>
                    <option value="3">新北市</option>
                    <option value="4">桃園縣</option>
                    <option value="5">新竹市</option>
                    <option value="6">新竹縣</option>
                    <option value="7">苗栗縣</option>
                    <option value="8">台中市</option>
                    <option value="9">彰化縣</option>
                    <option value="10">南投縣</option>
                    <option value="11">雲林縣</option>
                    <option value="12">嘉義市</option>
                    <option value="13">嘉義縣</option>
                    <option value="14">台南市</option>
                    <option value="15">高雄市</option>
                    <option value="16">屏東縣</option>
                    <option value="17">台東縣</option>
                    <option value="18">花蓮縣</option>
                    <option value="19">宜蘭縣</option>
                    <option value="20">澎湖縣</option>
                    <option value="21">金門縣</option>
                    <option value="22">連江縣</option>
                </select>
            </div>
        </div>
    );
}