const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UsingLibsContract", () => {
    let owner;
    let usingLibsContract;

    beforeEach(async () => {
        [owner] = await ethers.getSigners()

        const UsingLibsContract = await ethers.getContractFactory("UsingLibsContract")
        usingLibsContract = await UsingLibsContract.deploy()
        await usingLibsContract.deployed()
    })

    it("Compares strings", async function () {
        const result1 = await usingLibsContract.compareStr("cat", "cat")
        expect(result1).to.be.equal(true)

        const result2 = await usingLibsContract.compareStr("cat", "cat2")
        expect(result2).to.be.equal(false)
    })

    it("Finds item in array", async function () {
        const result1 = await usingLibsContract.arrayHas([1, 2, 3, 4], 3)
        expect(result1).to.be.equal(true)

        const result2 = await usingLibsContract.arrayHas([1, 2, 3, 4], 5)
        expect(result2).to.be.equal(false)
    })
})