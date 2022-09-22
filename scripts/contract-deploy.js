// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, network } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    if (network.name === "hardhat") {
        console.log("You use hardhat network. We recommend localhost")
    }

    [deployer] = await ethers.getSigners()

    const Auction = await ethers.getContractFactory("DutchAuction", deployer)
    const auction = await Auction.deploy(
        ethers.utils.parseEther('2.0'),
        100,
        'Nike NFT'
    )
    await auction.deployed()

    console.log("deployed by " + await deployer.getAddress())

    writeOutput({
        DutchAuction: auction
    })
}

function writeOutput(contracts) {
    const contractDir = path.join(__dirname, "..", "front/contracts")

    if (!fs.existsSync(contractDir)) {
        fs.mkdir(contractDir)
    }

    Object.entries(contracts).forEach(contractItem => {
        const [name, contract] = contractItem
        
        if (contract) {
            fs.writeFileSync(
                path.join(contractDir, '/', name + '-contract-address.json'),
                JSON.stringify({[name]: contract.address}, null, 2)
            )
        }

        const contractArtifacts = hre.artifacts.readArtifactSync(name)

        fs.writeFileSync(
            path.join(contractDir, '/', name + '-contract.json'),
            JSON.stringify(contractArtifacts, null, 2) 
        )
    })
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err)
        process.exit(1)
    })