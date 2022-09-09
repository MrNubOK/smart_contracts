const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AucEngine", function () {
    let owner;
    let seller;
    let winner;
    let aucEngine;

    beforeEach(async () => {
        [owner, seller, winner] = await ethers.getSigners()
        AucEngine = await ethers.getContractFactory("AucEngine", owner)
        aucEngine = await AucEngine.deploy()
        await aucEngine.deployed()
    })

    async function getTimeStamp(bn) {
        return (
            await ethers.provider.getBlock(bn)
        ).timestamp;
    }

    it("sets owner", async () => {
        const currentOwner = await aucEngine.owner();
        console.log(currentOwner)
        expect(currentOwner).to.eq(owner.address)
    })

    it("creates auction", async () => {
        const item = "ape NFT"
        const duration = 60

        const tx = await aucEngine.createAuction(
            ethers.utils.parseEther("0.0001"),
            3,
            item,
            duration
        )

        const auction = await aucEngine.auctions(0)
        expect(auction.item).to.eq(item)
        const ts = await getTimeStamp(tx.blockNumber)
        expect(auction.startsAt).to.eq(ts) 
        expect(auction.endsAt).to.eq(ts + duration) 
    })

    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    } 

    it("buys item", async () => {
        const tx = await aucEngine.connect(seller).createAuction(
            ethers.utils.parseEther("0.0001"),
            10,
            "ape NFT",
            600000
        )

        this.timeout(10000)
        await delay(5000)

        // const actualPrice = await aucEngine.getPrice(0)
        // console.log(actualPrice)
        const buyTx = await aucEngine.connect(winner).buy(0, {value: 99999999999950})

        // await expect(() => buyTx) 
            // .to.changeEtherBalances([winner, aucEngine], [-actualPrice, actualPrice])

        await expect(buyTx) 
            .to.emit(aucEngine, "AuctionEnded")
            .withArgs(0, "ape NFT", 99999999999950, winner.address)
     })
})