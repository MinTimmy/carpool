// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
// solidity
contract BookingCar {
  uint256 public departureTime;
  string public location;
  string public destination;
  uint256 public price;
  uint256 public remainingNumber = 3;
  uint256 public totalNumber = 3;
  string public licensePlate; 
  string public carAppearance;
  string public departureDetail;
  string public destinationDetail;
  address driverAddress;
  address[4] customerAddress;
  uint256 balance = 0;
  bool locked;
  uint256 temp;

  constructor(
    uint256 _departureTime,
    string memory _loaction,
    string memory _destination,
    uint256 _price,
    uint256 _totalNumber,
    string memory _licensePlate,
    string memory _carAppearance,
    string memory _departureDetail,
    string memory _destinationDetail
  ){
    departureTime = _departureTime;
    location = _loaction;
    destination = _destination;
    price = _price;
    remainingNumber = totalNumber = _totalNumber;
    licensePlate = _licensePlate;
    carAppearance = _carAppearance;
    departureDetail = _departureDetail;
    destinationDetail = _destinationDetail;
    driverAddress = msg.sender;
  }

  event DepositLog(address sender, uint256 value);
  event WithdrawLog(address sender, uint256 value);

  modifier onlyDriver() {
    require(msg.sender == driverAddress , "You are not driver");
    _;
  }
    
  modifier onlyCustomer() {
    bool check = false;

    for (temp = 0; temp < totalNumber; temp++){
      if (customerAddress[temp] == msg.sender){
        check = true;
        break;
      }
    }
    require(check, "You are not customer");
    _;
  }

  modifier validAddress(address _addr) {
    require(_addr != address(0), "Not valid address");
    _;
  }

  modifier noReentrancy() {
    require(!locked, "No reentrancy");

    locked = true;
    _;
    locked = false;
  }

  function getDriverAddress() view public returns(address){
    return driverAddress;
  }
  function getCustomerAddress() view public returns(address[4] memory ){
    return customerAddress;
  }
  function getBalance() view public returns(uint256){
    return balance;
  }
  function getLocked() view public returns(bool){
    return locked;
  }

  receive() payable external {
    customerAddress[totalNumber-remainingNumber] = msg.sender;
    remainingNumber--;
    balance += msg.value;
    emit DepositLog(msg.sender, msg.value);
  }

  function refund() public payable noReentrancy onlyCustomer{
    payable(customerAddress[temp]).transfer(price);
    delete customerAddress[temp];
    remainingNumber--;
    balance -= price;
  }

  function driverRewarding() public payable noReentrancy onlyDriver{
    payable(driverAddress).transfer(balance);
    balance = 0;
  }
}