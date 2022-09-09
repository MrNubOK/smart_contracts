const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Payments", function () {
    let acc1
    let acc2
    let payments

    beforeEach(async function() {
        [acc1, acc2] = await ethers.getSigners()
        const Payments = await ethers.getContractFactory("Payments", acc1)
        payments = await Payments.deploy()
        await payments.deployed()
        console.log(payments.address)
    })

    it("Contract address is valid", async function () {
        expect(payments.address).to.be.properAddress;
    })

    it("Contract should have 0 on balance", async function () {
        balance = await payments.getBalance();
        expect(balance).to.eq(0)
    })

    it("should be possible to send funds", async function() {
        sum = 100
        msg = "hello"
        const tx = await payments.connect(acc2).pay(msg, {value: sum})

        await expect(() => tx)
            .to.changeEtherBalance(acc2, -sum)

        await expect(() => tx)
            .to.changeEtherBalance(payments, sum)

        await tx.wait()
        
        const newPayment = await payments.getPayment(acc2.address, 0)
        expect(newPayment.message).to.eq(msg)
        expect(newPayment.value).to.eq(sum)
        expect(newPayment.from).to.eq(acc2.address)
    })
})