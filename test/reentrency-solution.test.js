const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ReentrencyAuction test", function() {
    let auction, huyakerContract;
    let auctionOwner, bidder1, bidder2, bidder3, mamkinHuyaker;

    beforeEach(async function() {
        [auctionOwner, bidder1, bidder2, bidder3, mamkinHuyaker] = await ethers.getSigners()
        const Auction = await ethers.getContractFactory("ReentrencyAuction", auctionOwner)
        auction = await Auction.deploy()
        await auction.deployed()

        const HuyakerContract = await ethers.getContractFactory("ReentrencyUsage", mamkinHuyaker)
        huyakerContract = await HuyakerContract.deploy(auction.address)
        await huyakerContract.deployed()
    })

    it("Auction working with reentrency bug", async function() {
        const tx1 = await auction.connect(bidder1).bid({value: ethers.utils.parseEther('1.0')})

        expect(await auction.getCurrencyBalance())
            .to.be.eq(ethers.utils.parseEther('1.0'))

        const tx2 = await auction.connect(bidder2).bid({value: ethers.utils.parseEther('3.0')})

        expect(await auction.getCurrencyBalance())
            .to.be.eq(ethers.utils.parseEther('4.0'))

        const tx3 = await auction.connect(bidder3).bid({value: ethers.utils.parseEther('4.0')})

        expect(await auction.getCurrencyBalance())
            .to.be.eq(ethers.utils.parseEther('8.0'))

        const txRefund1 = await auction.connect(bidder1).refund()

        expect(await auction.getCurrencyBalance())
            .to.be.eq(ethers.utils.parseEther('7.0'))

        const tx4 = await huyakerContract.connect(mamkinHuyaker).proxyBid({value: ethers.utils.parseEther('1.0')})
        await expect(huyakerContract.connect(mamkinHuyaker).mamkinHuyakerIdeUboi())
            .to.be.revertedWith("Failed transaction. Try again")

        expect(await auction.getCurrencyBalance())
            .to.be.eq(ethers.utils.parseEther('8.0'))
    })
})