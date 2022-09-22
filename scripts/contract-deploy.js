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
    if (network.name === 'hardhat') {
        console.warn("You use hardhat network. We recommend localhost")
    }

    const [deployer] = await ethers.getSigners()
    console.log("deployed by " + await deployer.getAddress())

    const Auction = await ethers.getContractFactory("DutchAuction", deployer)
    const auction = await Auction.deploy(
        ethers.utils.parseEther("2.0"),
        100,
        "NFT collection"
    )

    await auction.deployed()

    saveFrontendFiles({
        DutchAuction: auction
    })
}

function saveFrontendFiles(contracts) {
    const contractDir = path.join(__dirname, '../', 'front/contracts') 
    
    if (!fs.existsSync(contractDir)) {
        fs.mkdir(contractDir)
    }

    Object.entries(contracts).forEach(contractItem => {
        const [name, contract] = contractItem

        if (contract) {
            fs.writeFileSync(
                path.join(contractDir, '/', name + '-contracts-address.json'),
                JSON.stringify({[name]: contract.address}, undefined, 2)
            )
        }

        const ContractArtifact = hre.artifacts.readArtifactSync(name)

        fs.writeFileSync(
            path.join(contractDir, '/', name + '-contract.json'),
            JSON.stringify(ContractArtifact, null, 2)
        )
    })
}

main()
.then(() => process.exit(0))
.catch(err => {
    console.error(err)
    process.exit(1)
})