// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "./ContractList.sol";

contract BookingCar_Sepolia {
  bool public validContract = true;
  
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
  address[] customerAddress;
  uint256 balance = 0;
  bool locked;
  uint256 temp;

  address ContractListAddress = 0x78117C4E960e942340a32F415FAB6676CFc856E7;
  ContractList public contractList = ContractList(ContractListAddress);
  address defaultWalletAddress = 0x00e2DcE6e15BC5612a3EB5242CaC4c71672c6b29;

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

    for (temp = 0; temp < customerAddress.length; temp++){
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
  function getCustomerAddress() view public returns(address[] memory ){
    return customerAddress;
  }
  function getBalance() view public returns(uint256){
    return balance;
  }
  function getLocked() view public returns(bool){
    return locked;
  }

  receive() payable external {
    if(msg.sender == driverAddress && balance == 0){
      contractList.newContract(msg.sender, address(this));
    }
    else{
      customerAddress.push(msg.sender);
      remainingNumber--;
      contractList.booking(msg.sender, address(this));
    }
    
    balance += msg.value;
    emit DepositLog(msg.sender, msg.value);
  }

  // error
  function refund() public payable noReentrancy onlyCustomer{
    payable(msg.sender).transfer(price);
    for (temp = 0; temp < customerAddress.length; temp++){
      if (customerAddress[temp] == msg.sender){
        delete customerAddress[temp];
        remainingNumber++;
        balance -= price;
        contractList.refund(msg.sender, address(this));
        emit WithdrawLog(msg.sender, price);
        break;
      }
    }
    
  }

  function driverRewarding() public payable noReentrancy onlyDriver{
    payable(driverAddress).transfer(price * (totalNumber - remainingNumber));
    balance -= price * (totalNumber - remainingNumber);
    emit WithdrawLog(driverAddress, price * (totalNumber - remainingNumber));
    
    payable(defaultWalletAddress).transfer(balance);
    emit WithdrawLog(defaultWalletAddress, balance);
    balance = 0;
  }

  function setValidContract(bool state) public {
    validContract = state;
  }
}