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

        await expect(contract.connect(seller).createAuction(
            item, 
            startPrice, 
            discount, 
            300000000
        ))
        .to.be.revertedWith("Incorrect starting price")

        const createAucTx = await contract.connect(seller).createAuction(
            item, 
            startPrice, 
            discount, 
            duration
        )

        const auction = await contract.auctions(0) 
        
        startAt = await getTimeStamp(createAucTx.blockNumber)

        expect(auction.item).to.be.equal(item)
        expect(auction.startPrice).to.be.equal(startPrice)
        expect(auction.discountRate).to.be.equal(discount)
        expect(auction.startsAt).to.be.equal(startAt)
        expect(auction.endsAt).to.be.equal(startAt + duration)

        await expect(createAucTx)
            .to.emit(contract, "AuctionCreated")
            .withArgs(0, item, startPrice, duration)
    })

    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    it("Buys lot", async function () {
        const item = "Test"
        const startPrice = 300000000
        const discount = 10
        const duration = 600

        const createAucTx = await contract.connect(seller).createAuction(
            item, 
            startPrice, 
            discount, 
            duration
        )

        this.timeout(10000)
        await delay(4000)

        const price = await contract.getPrice(0)
    
        const buyTx = await contract.connect(winner).buy(0, {value: price})

        await expect(buyTx)
            .to.emit(contract, "AuctionEnded")
            .withArgs(0, item, 299999960, winner.address)

        await delay(4000)

        const priceAfterStop = await contract.getPrice(0)

        await expect(buyTx)
            .to.changeEtherBalance(seller, 299999960 - (299999960 * 10) / 100)

        await expect(contract.connect(winner).buy(0, {value: price}))
            .to.be.revertedWith('Auction stopped')
    })

    it("Time is up", async function () {
        const item = "Test"
        const startPrice = 300000000
        const discount = 10
        const duration = 1

        const createAucTx = await contract.connect(seller).createAuction(
            item, 
            startPrice, 
            discount, 
            1
        )

        this.timeout(5000)
        await delay(3000)

        await expect(contract.connect(winner).buy(0, {value: startPrice}))
            .to.be.revertedWith('Auction stopped')
    })

    it("Not enough founds", async () => {
        const item = "Test"
        const startPrice = 300000000
        const discount = 10
        const duration = 100

        const createAucTx = await contract.connect(seller).createAuction(
            item, 
            startPrice, 
            discount, 
            duration
        )

        await expect(contract.buy(0, {value: 200000000}))
            .to.revertedWith("Not enough funds")
    })

    it("Refounds", async () => {
        const item = "Test"
        const startPrice = 300000000
        const discount = 10
        const duration = 100

        const createAucTx = await contract.connect(seller).createAuction(
            item, 
            startPrice, 
            discount, 
            duration
        )

        await expect(contract.connect(winner).buy(0, {value: 310000000}))
            .to.changeEtherBalance(winner, -299999990)
    })

    it("Default duration", async function () {
        const item = "Test"
        const startPrice = 300000000
        const discount = 10

        const createAucTx = await contract.connect(seller).createAuction(
            item, 
            startPrice, 
            discount, 
            0
        )

        const auction = await contract.auctions(0)

        const defaultDuration = await contract.DURATION()
        const calcalatedEndsAt = auction.startsAt.add(defaultDuration)
        console.log(auction.endsAt, auction.startsAt, defaultDuration, calcalatedEndsAt)

        expect(auction.endsAt)
            .to.be.equal(calcalatedEndsAt)
    })
})