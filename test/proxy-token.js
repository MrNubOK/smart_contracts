const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Proxy test", () => {
    async function dev() {
        const [deployer] = await ethers.getSigners()
        const RTKFactory = await ethers.getContractFactory("RTKToken", deployer)
        const token = await upgrades.deployProxy(RTKFactory, [], {
            initializer: "initalize"
        })
        await token.deployed()

        return {token, deployer}
    }

    it("works", async function() {
        const {token, deployer} = await loadFixture(dev);
        const tx = await token.safeMint(deployer.address, 'afasffsa');
        await tx.wait()

        expect(await token.balanceOf(deployer.address)).to.eq(1)

        const RTKFactory2 = await ethers.getContractFactory("RTKToken2", deployer)
        const token2 = await upgrades.upgradeProxy(token.address, RTKFactory2)

        expect(await token2.balanceOf(deployer.address)).to.eq(1)

        expect(await token2.test()).to.be.true;
    });
});