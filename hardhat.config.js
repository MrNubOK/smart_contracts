require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");
require('hardhat-deploy');
require('./tasks/sample-tasks');
require("@openzeppelin/hardhat-upgrades");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
};
