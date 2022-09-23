// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TestAutction {
    mapping (address => uint) public bidders;
    bool isLocked;

    modifier ReenrencyBlock {
        require(!isLocked, "Reentrency block");
        isLocked = true;
        _;
        isLocked = false;
    }

    function bid() external payable {
        bidders[msg.sender] += msg.value;
    }

    function currencyBalance() external view returns(uint) {
        return address(this).balance;
    }

    function refund() external ReenrencyBlock {
        uint refundAmount = bidders[msg.sender];

        if (refundAmount > 0) {
            bidders[msg.sender] = 0;
            (bool success, ) = msg.sender.call{value: refundAmount}("");
            require(success, "Transaction failed");
        }
    }
}

contract MamkinHuyaker {
    uint constant BID_AMOUNT = 1 ether;
    TestAutction auction;

    constructor(address auctionAddress) {
        auction = TestAutction(auctionAddress);
    } 

    function currentBalance() external view returns(uint) {
        return address(this).balance;
    }

    function proxyBid() external payable {
        require(msg.value == BID_AMOUNT, "Incorrect bid!");
        auction.bid{value: msg.value}();
    } 

    function mamkinHuyakerIdeUboi() external {
        auction.refund();
    }

    receive() external payable {
        if (auction.currencyBalance() >= BID_AMOUNT) {
            auction.refund();
        }
    }
}