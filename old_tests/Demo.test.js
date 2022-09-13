const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contracts test", () => {
    let demo;
    let logger;
    let owner;

    beforeEach(async () => {
        [owner] = await ethers.getSigners()
        const Logger = await ethers.getContractFactory("Logger")
        logger = await Logger.deploy()
        await logger.deployed()

        const Demo = await ethers.getContractFactory("Demo")
        demo = await Demo.deploy(logger.address)
        await demo.deployed()
    })

    it("allows to pay and get payment data", async function() {
        const sum = 100000000

        const txData = {
            value: sum,
            to: demo.address
        }

        const tx = await owner.sendTransaction(txData)
        await tx.wait()

        await expect(tx)
            .to.changeEtherBalance(demo, sum) 

        const amount = await demo.getPaymentData(owner.address, 0)
        expect(amount).to.be.equal(sum)
    })
})