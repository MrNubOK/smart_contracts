const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Privacy test", () => {
    let privacyContract;

    beforeEach(async function() {
        [owner] = await ethers.getSigners()
        const PrivacyContract = await ethers.getContractFactory("Privacy", owner)
        privacyContract = await PrivacyContract.deploy([
            ethers.utils.formatBytes32String("secret1"),
            ethers.utils.formatBytes32String("secret2"),
            ethers.utils.formatBytes32String("secret3"),
        ])
        await privacyContract.deployed()
    })

    it("Privacy", async function () {
        const locked = await ethers.provider.getStorageAt(privacyContract.address, 0);
        console.log(locked)

        const timestamp = await ethers.provider.getStorageAt(privacyContract.address, 1);
        console.log(timestamp)

        const flatteningDenominationAwkwardness = await ethers.provider.getStorageAt(privacyContract.address, 2);
        console.log(flatteningDenominationAwkwardness)

        const firstArrayItem = ethers.utils.parseBytes32String(
            await ethers.provider.getStorageAt(privacyContract.address, 3)
        );
        console.log(firstArrayItem)

        const secondArrayItem = ethers.utils.parseBytes32String(
            await ethers.provider.getStorageAt(privacyContract.address, 4)
        );
        console.log(secondArrayItem)

        const thirdArrayItem = ethers.utils.parseBytes32String(
            await ethers.provider.getStorageAt(privacyContract.address, 5)
        );
        console.log(thirdArrayItem)
    })  
});