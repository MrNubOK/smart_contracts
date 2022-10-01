const { ethers } = require("hardhat");

// deploy/00_deploy_my_contract.js
module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    await deploy('Vault', {
      from: deployer,
      args: [ethers.utils.formatBytes32String("secret")],
      log: true,
    });
  };
  module.exports.tags = ['Vault'];