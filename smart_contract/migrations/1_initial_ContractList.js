const ContractList = artifacts.require("ContractList");

module.exports = function (deployer) {
  deployer.deploy(ContractList);
};