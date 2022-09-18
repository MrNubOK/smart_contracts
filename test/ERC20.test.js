const { expect } = require("chai")
const { ethers } = require("hardhat")
const tokenJSON = require("../artifacts/contracts/ERC201.sol/MDCToken.json")

describe("ERC20 Test", async function () {
    let owner;
    let store;
    let erc20;

    beforeEach(async () => {
        [owner, buyer] = await ethers.getSigners()
        const Store = await ethers.getContractFactory("MDCStore", owner)
        store = await Store.deploy()
        await store.deployed()

        erc20 = new ethers.Contract(await store.token(), tokenJSON.abi, owner)
    })

    it("it should have owner", async function() {
        expect(await store.owner() == owner);
    });

    it("it buys tokens", async function () {
        const amount = 100;

        const buyTx = await buyer.sendTransaction({value: amount, to: store.address})
        await buyTx.wait()

        expect(await erc20.balanceOf(buyer.address))
            .to.be.eq(amount)

        await expect(buyTx)
            .emit(store, "Bought")
                .withArgs(amount, buyer.address)
    }); 

    it("it sells tokens", async function () {
        const amountToBuy = 100;
        const amountToSell = 50;

        const buyTx = await buyer.sendTransaction({value: amountToBuy, to: store.address})
        await buyTx.wait()

        const approveTx = await erc20.connect(buyer).approve(store.address, amountToSell);
        await expect(approveTx)
            .emit(erc20, "Approval")
                .withArgs(buyer.address, store.address, amountToSell)

        const sellTx = await store.connect(buyer).sell(amountToSell)
        await sellTx.wait()

        await expect(sellTx)
            .emit(store, "Sold")
                .withArgs(amountToSell, buyer.address)
    }); 
});