// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
// solidity
contract ContractList {
  // uint256 numOfContract = 0;
  // uint256 maxOrderNum = 10;

  address[] contractList;
  address[] customerList;
  address[] driverList;
  mapping(address => address[]) orderTable_customer; // userAddr => contractAddr;
  mapping(address => address[]) orderTable_driver; // userAddr => contractAddr;
  
  constructor(){

  }

  function listAllContract() public view returns(address[] memory, uint256 ){
    return (contractList, contractList.length);
  }
  function listAllCustomer() public view returns(address[] memory, uint256 ){
    return (customerList, customerList.length);
  }
  function listAllDriver() public view returns(address[] memory, uint256 ){
    return (driverList, driverList.length);
  }

  function findContract_customer(address _addr) public view returns(address[] memory){
    return orderTable_customer[_addr];
  }
  function findContract_driver(address _addr) public view returns(address[] memory){
    return orderTable_driver[_addr];
  }


  function newContract(address driverAddr, address contractAddr) public {
    // orderTable[driverAddr] = contractAddr;
    orderTable_driver[driverAddr].push(contractAddr);
    if(orderTable_driver[driverAddr].length == 1){
      driverList.push(driverAddr);
    }
    contractList.push(contractAddr);
    // numOfContract++;
  } 

  function booking(address customerAddr, address contractAddr) public {
    // orderTable[customerAddr] = contractAddr;
    orderTable_customer[customerAddr].push(contractAddr);
    if(orderTable_customer[customerAddr].length == 1){
      customerList.push(customerAddr);
    }
    // return orderTable_customer[customerAddr];
  }
  function refund(address customerAddr, address contractAddr) public returns(bool){
    for(uint256 i = 0; i < orderTable_customer[customerAddr].length; i++){
      if(orderTable_customer[customerAddr][i] == contractAddr){
        delete orderTable_customer[customerAddr][i];
        return true;
      }
    }
    return false;
  }

  function clearCustomer() public {
    while(customerList.length != 0){
      address _key = customerList[customerList.length-1];
      customerList.pop();
      while(orderTable_customer[_key].length != 0){
        orderTable_customer[_key].pop();
      }
    }
  }

  function clearDriver() public {
    while(driverList.length != 0){
      address _key = driverList[driverList.length-1];
      driverList.pop();
      while(orderTable_driver[_key].length != 0){
        orderTable_driver[_key].pop();
      }
    }
  }
  // error
  function clearContract() public {
    while(contractList.length != 0){
      contractList.pop();
    }
  }
}