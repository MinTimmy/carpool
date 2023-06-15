
const sample = require('D:\\Code\\Blockchain_2\\TermProject\\demo1\\build\\contracts\\ContractList.json');
const fs = require('fs');
// console.log(Object.keys(sample))


_code = JSON.stringify(sample["abi"]);

_code = "const abi  = [\n " + _code.toString() + "]\n\nmodule.exports = abi"

fs.writeFile('D:\\Code\\Blockchain_2\\TermProject\\shue_2\\src\\abiContractList.js', _code, err => {
  if (err) {
    console.error(err);
  }
});