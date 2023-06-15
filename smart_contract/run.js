var BookingCar = artifacts.require("BookingCar");
var ContractList = artifacts.require("ContractList");
module.exports = async(callback) => {
  let address = {
    BookingCar_1: "0x07725340c6C6857209CD39C2a9bab07B9755Fe46",
    BookingCar_2: "0x49Ea992ECa9343bfa36bC43e81fb42dD15691575",
    ContractList: "0x8E1a4505ebc24f1f413F93FeAa51Df4799D4dA0f"   
  }
  let wallet = [
    "0x00e2DcE6e15BC5612a3EB5242CaC4c71672c6b29",
    "0x7734a1F703A7a8a9faDd0e5d59DA19aa842f072C",
    "0x986d3d5aF9455cbFa2132001696809646c1b982c"
  ]
  let bookingCar = await BookingCar.at(address.BookingCar_1);
  let contractList = await ContractList.at(address.ContractList);
  let res;
  res = await bookingCar.getBalance();
  // console.log("balance", res)
  // await contractList.newContract(wallet[0], address.BookingCar_1)
  // await contractList.newContract(wallet[1], "0x49Ea992ECa9343bfa36bC43e81fb42dD15691575")
  // await contractList.newContract(wallet[1], "0x49Ea992ECa9343bfa36bC43e81fb42dD15691576")
  // await contractList.newContract(wallet[1], "0x49Ea992ECa9343bfa36bC43e81fb42dD15691577")
  // await contractList.newContract(wallet[1], address.BookingCar_2)
  // await contractList.booking(wallet[2], address.BookingCar_1)

  res = await contractList.listAllContract();
  console.log("listAllContract", res)
  for(let i = 0; i < res["1"]["words"][0]; i++){
    console.log(i, res['0'][i]);
  }
  res = await contractList.listAllCustomer();
  console.log("listAllCustomer", res)
  for(let i = 0; i < res["1"]["words"][0]; i++){
    console.log(i, res['0'][i]);
  }
  res = await contractList.listAllDriver();
  console.log("listAllDriver", res)
  for(let i = 0; i < res["1"]["words"][0]; i++){
    console.log(i, res['0'][i]);
  }

  await contractList.clearCustomer();
  await contractList.clearDriver();
  res = await contractList.clearContract();
  console.log(_addr)
  callback();
};
 