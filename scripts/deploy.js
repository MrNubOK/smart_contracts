// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs")
const path = require("path")

async function main() {
  if (network.name === "hardhat") {
    console.warn("You use Hardhat network");
  }

  // const ONE_DAY_IN_SECS = 365 * 24 * 60 * 60;

  const [deployer] = await ethers.getSigners()
  console.log("Deploying with " + await deployer.getAddress())

  const Auction = await ethers.getContractFactory("DutchAuction", deployer)
  const auction = await Auction.deploy(
    ethers.utils.parseEther("2.0"),
    100,
    "Test item"
  )
  
  await auction.deployed();

  saveContractFiles({
    DutchAuction: auction
  })

  console.log(
    `Contract was successfully deployed`
  );
}

function saveContractFiles(contracts) {
  const contractsDir = path.join(__dirname, '..', 'front/contracts')

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir)
  }

  Object.entries(contracts).forEach(item => {
    const [name, contract] = item

    if (contract) {
      fs.writeFileSync(
        path.join(contractsDir, '/', name + '-contracts-address.json'),
        JSON.stringify({[name]: contract.address}, undefined, 2)
      )
    }

    const ContractArtifact = hre.artifacts.readArtifactSync(name) 

    fs.writeFileSync(
      path.join(contractsDir, '/', name + '.json'),
      JSON.stringify(ContractArtifact, null, 2)
    )
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
