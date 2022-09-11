const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AucEngine test", () => {
    let contract;

    beforeEach(async () => {
        [owner, seller, winner] = await ethers.getSigners()
        const Contract = await ethers.getContractFactory("AucEngine", owner)
        contract = await Contract.deploy()
        await contract.deployed()
    })

    async function getTimeStamp(blockId) {
        return (await ethers.provider.getBlock(blockId)).timestamp
    }

    it("Sets owner", async () => {
        currentOwner = await contract.owner()
        expect(currentOwner).to.eq(owner.address)
    })

    it("Auction can be created", async () => {
        const item = "Test"
        const startPrice = 300000000
        const discount = 10
        const duration = 600

        const tx = await contract.createAuction(
            item, 
            startPrice, 
            discount, 
            duration
        )

        const auction = await contract.auctions(0) 
        
        startAt = await getTimeStamp(tx.blockNumber)

        expect(auction.item).to.be.equal(item)
        expect(auction.startPrice).to.be.equal(startPrice)
        expect(auction.discountRate).to.be.equal(discount)
        expect(auction.startsAt).to.be.equal(startAt)
        expect(auction.endsAt).to.be.equal(startAt + duration)
    })
})