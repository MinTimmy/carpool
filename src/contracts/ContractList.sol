// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
// solidity
contract ContractList {
  uint256 numOfContract = 0;
  uint256 maxOrderNum = 10;
  address[] contractList;
  mapping(address => address[]) orderTable; // userAddr => contractAddr;

  constructor(){

  }

  function listAllContract() public view returns(address[] memory, uint256 ){
    return (contractList, numOfContract);
  }

  function findContract(address _addr) public view returns(address[] memory){
    // if(orderTable[_addr].length != 0) return orderTable[_addr];
    return orderTable[_addr];
    // return ;
  }


  function newContract(address driverAddr, address contractAddr) public {
    // orderTable[driverAddr] = contractAddr;
    orderTable[driverAddr].push(contractAddr);
    contractList.push(contractAddr);
    numOfContract++;
  } 

  function booking(address customerAddr, address contractAddr) public {
    // orderTable[customerAddr] = contractAddr;
    orderTable[customerAddr].push(contractAddr);
  }
}