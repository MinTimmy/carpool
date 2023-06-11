import React from 'react';
import './css/PostCard.css';
import Web3 from "web3";
// const Web3 = require('web3');

export default function ShowContractContent(props) {
  const getContractContents = async () => {
    props.setContract(
      () =>
        new props.web3.eth.Contract(props.abi, props.smartContractAddress, {
          from: props.walletAddress,
        })
    );
    let departureTime = await props.contract.methods.departureTime
      .call()
      .call()
      .then((data) => data);
    let location = await props.contract.methods.location
      .call()
      .call()
      .then((data) => data);
    let destination = await props.contract.methods.destination
      .call()
      .call()
      .then((data) => data);
    let price = await props.contract.methods.price
      .call()
      .call()
      .then((data) => data);
    let remainingNumber = await props.contract.methods.remainingNumber
      .call()
      .call()
      .then((data) => data);
    let totalNumber = await props.contract.methods.totalNumber
      .call()
      .call()
      .then((data) => data);
    let licensePlate = await props.contract.methods.licensePlate
      .call()
      .call()
      .then((data) => data);
    let carAppearance = await props.contract.methods.carAppearance
      .call()
      .call()
      .then((data) => data);
    let driverAddress = await props.contract.methods
      .getDriverAddress()
      .call()
      .then((data) => data);
    let customerAddress = await props.contract.methods
      .getCustomerAddress()
      .call()
      .then((data) => data);
    let balance = await props.contract.methods
      .getBalance()
      .call()
      .then((data) => data);

    props.setContractContents((prevContractContents) => {
      return {
        ...prevContractContents,
        departureTime: departureTime * 1000,
        location: location,
        destination: destination,
        price: price,
        remainingNumber: remainingNumber,
        totalNumber: totalNumber,
        licensePlate: licensePlate,
        carAppearance: carAppearance,
        driverAddress: driverAddress.toLowerCase(),
        customerAddress: customerAddress,
        balance: Web3.utils.fromWei(balance.toString(), 'ether'),
      };
    });
  };
  React.useEffect(() => {
    getContractContents();
  }, [props.refreshContractContents]);

  const convertTime = (date) => {
    date = parseInt(date);
    date = new Date(date);

    const padTo2Digits = (num) => {
      return num.toString().padStart(2, '0');
    };
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
  };

  const showCustomerAddress = () => {
    if (
      props.contractContents['totalNumber'] -
      props.contractContents['remainingNumber'] ===
      0
    ) {
      return 'No one';
    }
    let rawHTML = '';
    for (
      let i = 0;
      i <
      props.contractContents['totalNumber'] -
      props.contractContents['remainingNumber'];
      i++
    ) {
      rawHTML += `${props.contractContents['customerAddress'][
        i
      ].toLowerCase()}, `;
    }
    return rawHTML;
  };
  const showIdentity = () => {
    if (props.walletAddress === props.contractContents['driverAddress']) {
      return 'driver';
    }
    for (
      let i = 0;
      i <
      props.contractContents['totalNumber'] -
      props.contractContents['remainingNumber'];
      i++
    ) {
      if (props.contractContents['customerAddress'] === props.walletAddress) {
        return 'customer';
      }
    }
    return 'not in this contract';
  };
  return (
    <>
      <div>
        {/* <button onClick={getContractContents}>refresh</button>   */}
        <p>smartContractAddress: {props.smartContractAddress}</p>
        <p>You are {showIdentity()}</p>
        <p>
          departureTime: {convertTime(props.contractContents['departureTime'])}
        </p>
        <p>location: {props.contractContents['location']}</p>
        <p>destination: {props.contractContents['destination']}</p>
        <p>
          price:{' '}
          {Web3.utils.fromWei(
            props.contractContents['price'].toString(),
            'ether'
          )}{' '}
          ether
        </p>
        <p>remainingNumber: {props.contractContents['remainingNumber']}</p>
        <p>totalNumber: {props.contractContents['totalNumber']}</p>
        <p>licensePlate: {props.contractContents['licensePlate']}</p>
        <p>driverAddress: {props.contractContents['driverAddress']}</p>
        <p>customerAddress: {showCustomerAddress()}</p>
        <p>
          {' '}
          {props.walletAddress === props.contractContents['driverAddress'] &&
            `balance: ${props.contractContents['balance']}`}
        </p>
      </div>
    </>
  );
}
