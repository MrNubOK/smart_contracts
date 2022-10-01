const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault", () => {
    let vault;

    beforeEach(async function() {
        [owner] = await ethers.getSigners()
        const Vault = await ethers.getContractFactory("Vault", owner)
        vault = await Vault.deploy(ethers.utils.formatBytes32String("pass"))
        await vault.deployed()
    })

    it("Test", async function () {
        const pass = await ethers.provider.getStorageAt(vault.address, 1);
        console.log(
            ethers.utils.parseBytes32String(pass)
        )
    })  
});