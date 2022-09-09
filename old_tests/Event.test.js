const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Event", function () {
    let owner
    let other_addr
    let eventContract
    
    this.beforeEach(async function () {
        [owner, other_addr] = await ethers.getSigners()

        const EventContract = await ethers.getContractFactory("Event", owner)
        eventContract = await EventContract.deploy()
        await eventContract.deployed()
    })

    async function sendMoney(sender, amount) {
        const txData = {
            to: eventContract.address,
            value: amount
        }

        const tx = await sender.sendTransaction(txData);
        await tx.wait();
        return tx
    }

    it("should allow to send money", async function () {
        amount = 100
        const sendMoneyTx = await sendMoney(other_addr, amount)
        
        await expect(() => sendMoneyTx)
            .to.changeEtherBalance(eventContract, amount);

        timestamp = (await ethers.provider.getBlock(sendMoneyTx.blockNumber)).timestamp

        await expect(sendMoneyTx)
            .to.emit(eventContract, "Paid")
            .withArgs(other_addr.address, amount, timestamp)
    })  

    it("owner should alow to withdraw money", async function () {
        amount = 200
        const sendMoneyTx = await sendMoney(other_addr, amount)

        await expect(() => sendMoneyTx)
            .to.changeEtherBalances([other_addr, eventContract], [-amount, amount])

        const tx = await eventContract.connect(owner).withdraw(owner.address)

        await expect(() => tx)
            .to.changeEtherBalances([owner, eventContract.address], [amount, -amount])
    })

    it("other addr should not be allowed to withdraw money", async function() {
        amount = 300
        const sendMoneyTx = await sendMoney(other_addr, amount)

        await expect(() => sendMoneyTx)
            .to.changeEtherBalances([other_addr, eventContract], [-amount, amount])

        await expect(eventContract.connect(other_addr).withdraw(owner.address)) 
            .to.be.revertedWith("You're not an owner")
    })
})