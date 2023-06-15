const Web3 = require('web3');
const BookingCar = artifacts.require("BookingCar");
let localeTime = "2023-05-25 12:00:00";
// let localeTime = "2023-06-30 16:30:00";
localeTime = new Date(localeTime).getTime();
module.exports = function (deployer) {
  // deployer.deploy(BookingCar,
  //   // 1684195200,   // uint256 _departureTime,  2023/05/16 00:00:00
  //   localeTime / 1000,
  //   "Puli",// string memory _loaction,
  //   "Taichung",// string memory _destination,
  //   Web3.utils.toWei("0.01", 'ether'),// uint256 _price,
  //   3,// uint256 _totalNumber,
  //   "NNN-3388",// string memory _lincensePlate,
  //   "Black"// string memory _carAppearance
  //   );

    // deployer.deploy(BookingCar,
    //   // 1684195200,   // uint256 _departureTime,  2023/05/16 00:00:00
    //   localeTime / 1000,
    //   "台中",// string memory _loaction,
    //   "南投",// string memory _destination,
    //   Web3.utils.toWei("0.01", 'ether'),// uint256 _price,
    //   3,// uint256 _totalNumber,
    //   "ABC-1234",// string memory _lincensePlate,
    //   "mini cooper 藍",// string memory _carAppearance
    //   "台中火車站",
    //   "暨南大學",
    //   );

      deployer.deploy(BookingCar,
        // 1684195200,   // uint256 _departureTime,  2023/05/16 00:00:00
        localeTime / 1000,
        "台中",// string memory _loaction,
        "台北",// string memory _destination,
        Web3.utils.toWei("0.09", 'ether'),// uint256 _price,
        3,// uint256 _totalNumber,
        "CBA-7777",// string memory _lincensePlate,
        "Discovery Sport 白",// string memory _carAppearance
        "台中火車站",
        "台北轉運站",
        );
};