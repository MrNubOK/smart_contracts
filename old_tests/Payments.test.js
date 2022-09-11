const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

describe("AucEngine test", () => {
    let contract;

    beforeEach(async () => {
        [owner, seller, winner] = await ethers.getSigners()
        const Contract = await ethers.getContractFactory("AucEngine", owner)
        contract = await Contract.deploy()
        await contract.deployed()
    })

    it("Sets owner", async () => {
        currentOwner = await contract.owner()
        console.log(currentOwner)
        expect(currentOwner).to.eq(owner.address)
    })

    it("Auction can be created", async () => {
        // tx = await contract.createAuction("Test", 300000000, 10, 600)
        // expect(tx => {})
    })
})