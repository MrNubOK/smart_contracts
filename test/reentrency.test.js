const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reentrency test", () => {
    let auctionOwner, bidder1, bidder2, mamkinHuyaker
    let auction, huyakerContract

    beforeEach(async function () {
        [auctionOwner, bidder1, bidder2, mamkinHuyaker] = await ethers.getSigners()
        const Auction = await ethers.getContractFactory("TestAutction", auctionOwner)
        auction = await Auction.deploy()
        await auction.deployed()

        const HuyakerContract = await ethers.getContractFactory("MamkinHuyaker", mamkinHuyaker)
        huyakerContract = await HuyakerContract.deploy(auction.address)
        await huyakerContract.deployed()
    })

    it("Reentrency test", async function () {
        const txBid1 = await auction.connect(bidder1).bid({value: ethers.utils.parseEther('5.0')})
        await txBid1.wait()

        const txBid2 = await auction.connect(bidder2).bid({value: ethers.utils.parseEther('9.0')})
        await txBid2.wait()

        expect(await auction.currencyBalance())
            .to.be.eq(ethers.utils.parseEther("14.0"))

        const txBid3 = await huyakerContract.connect(mamkinHuyaker).proxyBid({value: ethers.utils.parseEther('1.0')})
        await txBid3.wait()

        //All good
        expect(await auction.currencyBalance())
            .to.be.eq(ethers.utils.parseEther("15.0"))

        //Reentrency attack. Hah, try againg
        await expect(huyakerContract.connect(mamkinHuyaker).mamkinHuyakerIdeUboi())
            .to.be.revertedWith("Transaction failed")
        
        //Fuck him, we fixed reentrency 
        expect(await auction.currencyBalance())
            .to.be.eq(ethers.utils.parseEther("15.0"))
    })
})