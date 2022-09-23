const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Dos test", () => {
    let auctionOwner, bidder1, bidder2, mamkinHuyaker;
    let auction, dosContract;

    beforeEach(async () => {
        [auctionOwner, bidder1, bidder2, mamkinHuyaker] = await ethers.getSigners()
        const Auction = await ethers.getContractFactory("Auction", auctionOwner)
        auction = await Auction.deploy()
        await auction.deployed()

        const DosAttack = await ethers.getContractFactory("DosAttack", mamkinHuyaker)
        dosContract = await DosAttack.deploy(auction.address)
        await dosContract.deployed()
    })

    it("Auction with dos. Without block", async () => {
        const bidTx1 = await auction.connect(bidder1).bid({value: ethers.utils.parseEther("2.0")})
        await bidTx1.wait() 

        const bidTx2 = await auction.connect(bidder2).bid({value: ethers.utils.parseEther("3.0")})
        await bidTx2.wait() 

        expect (await auction.currentlyBalance())
            .to.be.eq(ethers.utils.parseEther("5.0"))

        const bidTx3 = await dosContract.connect(mamkinHuyaker).bid({value: ethers.utils.parseEther("0.000000000001")})
        await bidTx3.wait() 

        await auction.connect(auctionOwner).refund()

        expect (await auction.currentlyBalance())
            .to.be.eq(ethers.utils.parseEther("0.0"))
    })

    it("Auction with dos. With block", async () => {
        const bidTx1 = await auction.connect(bidder1).bid({value: ethers.utils.parseEther("2.0")})
        await bidTx1.wait() 

        const bidTx2 = await auction.connect(bidder2).bid({value: ethers.utils.parseEther("3.0")})
        await bidTx2.wait() 

        expect (await auction.currentlyBalance())
            .to.be.eq(ethers.utils.parseEther("5.0"))

        const bidTx3 = await dosContract.connect(mamkinHuyaker).bid({value: ethers.utils.parseEther("0.000000000001")})
        await bidTx3.wait() 

        await dosContract.connect(mamkinHuyaker).toggleBlocked()
        blocked = await dosContract.blocked()
        await auction.connect(auctionOwner).refund()

        expect (await auction.currentlyBalance())
            .to.be.eq(ethers.utils.parseEther("0.000000000001"))

        //let's find our jerk
        const donkeyFuckerAddress = await auction.withFailedRefunds(0)
        const whatWeWillRefundToDonkeyFucker = await auction.bidders(donkeyFuckerAddress)
        console.log(whatWeWillRefundToDonkeyFucker)
    })
})