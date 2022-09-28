const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Dos test", function () {
    let auction, dosContract 
    let auctionOwner, bidder1, bidder2, bidder3, jerk

    beforeEach(async function () {
        [auctionOwner, bidder1, bidder2, bidder3, jerk] = await ethers.getSigners()
        const Auction = await ethers.getContractFactory("DosAuction", auctionOwner)
        auction = await Auction.deploy()
        await auction.deployed()

        const DosContract = await ethers.getContractFactory("DosUsage", jerk)
        dosContract = await DosContract.deploy(auction.address)
        await auction.deployed()
    })

    it("Auction is working fine", async function() {
        const tx1 = await auction.connect(bidder1).bid({value: ethers.utils.parseEther("1.0")})

        const tx2 = await auction.connect(bidder2).bid({value: ethers.utils.parseEther("2.0")})

        const tx3 = await auction.connect(jerk).bid({value: ethers.utils.parseEther("0.00001")})

        const tx4 = await auction.connect(bidder3).bid({value: ethers.utils.parseEther("4.0")})

        expect(await auction.getCurrentBalance())
            .to.be.equal(ethers.utils.parseEther("7.00001"))

        const runRefundTx = await auction.connect(auctionOwner).refund()

        expect(await auction.getCurrentBalance())
            .to.be.equal(ethers.utils.parseEther("0"))
    })

    it("Auction is not working with dos", async function() {
        const tx1 = await auction.connect(bidder1).bid({value: ethers.utils.parseEther("1.0")})

        const tx2 = await auction.connect(bidder2).bid({value: ethers.utils.parseEther("2.0")})

        const toggleDos = await dosContract.connect(jerk).toggleDos()
        const tx3 = await dosContract.connect(jerk).bid({value: ethers.utils.parseEther("0.00001")})

        const tx4 = await auction.connect(bidder3).bid({value: ethers.utils.parseEther("4.0")})

        expect(await auction.getCurrentBalance())
            .to.be.equal(ethers.utils.parseEther("7.00001"))

        await expect(auction.connect(auctionOwner).refund())
            .to.be.revertedWith("Transaction failed")

        expect(await auction.getCurrentBalance())
            .to.be.equal(ethers.utils.parseEther("7.00001"))
    })
})