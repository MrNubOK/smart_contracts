const { expect } = require("chai");
const { ethers } = require("hardhat");
const tokenJSON = require("../artifacts/contracts/ERC20.sol/RINAToken.json")

describe("TokenStore", () => {
    let owner;
    let buyer;
    let store;
    let erc20;

    beforeEach(async () => {
        [owner, buyer] = await ethers.getSigners()
        const Store = await ethers.getContractFactory("RINAStore", owner)
        store = await Store.deploy()
        await store.deployed()

        erc20 = new ethers.Contract(await store.token(), tokenJSON.abi, owner)
    })

    it("should have an owner", async function() {
        expect(await store.owner()).to.eq(owner.address)
        expect(await store.token()).to.be.properAddress
    })

    it("allows to buy", async function () {
        tokenAmount = 100;

        const buyTx = await buyer.sendTransaction({value: tokenAmount, to: store.address})
        await buyTx.wait()

        expect(await erc20.balanceOf(buyer.address) == tokenAmount)
        await expect(() => buyTx)
            .to.changeEtherBalances([buyer, store], [-tokenAmount, tokenAmount])

        await expect(buyTx)
            .to.emit(store, "Bought")
                .withArgs(tokenAmount, buyer.address)
    }); 

    it("allows to sell", async function () {
        tokenAmount = 100;

        const buyTx = await buyer.sendTransaction({value: tokenAmount, to: store.address})
        await buyTx.wait()

        const approval = await erc20.connect(buyer).approve(store.address, 50)
        await approval.wait()

        const sellTx = await store.connect(buyer).sell(50)
        await sellTx.wait()

        amountToSell = 50

        expect(await erc20.balanceOf(buyer.address))
            .to.be.eq(amountToSell)

        await expect(sellTx)
            .to.emit(store, "Sold")
                .withArgs(amountToSell, buyer.address)
    });
});