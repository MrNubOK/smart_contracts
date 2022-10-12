const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Upgradeable token", function () {
    async function dep() {
        const [deployer] = await ethers.getSigners();

        const NFTFactory = await ethers.getContractFactory("MyToken");
        const token = await upgrades.deployProxy(NFTFactory, [], {
            initializer: "initialize"
        });
        await token.deployed()

        return {token, deployer}
    }

    it("works", async function() {
        const {token, deployer} = await loadFixture(dep);
        const mintTx = await token.safeMint(deployer.address, "safaf");
        await mintTx.wait()

        expect(await token.balanceOf(deployer.address))
            .to.eq(1)
    })
})
