// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ReentrencyAuction {
    mapping(address => uint) bidders;
    bool locked;

    modifier lockReentrency() {
        require(!locked, "Reentrency locked");
        locked = true;
        _;
        locked = false;
    }

    function getCurrencyBalance() external view returns(uint) {
        return address(this).balance;
    }

    function bid() external payable {
        bidders[msg.sender] += msg.value;
    }

    function refund() external lockReentrency {
        uint refundAmount = bidders[msg.sender];

        if (refundAmount >= 0) {
            bidders[msg.sender] = 0;
            (bool result, ) = msg.sender.call{value: refundAmount}("");
            require(result, "Failed transaction. Try again");
        }
    }
}

contract ReentrencyUsage {
    address payable owner;
    ReentrencyAuction public auction;
    uint bidAmount = 1 ether;

    constructor(address _auction) {
        owner = payable(msg.sender);
        auction = ReentrencyAuction(_auction);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "You're not an owner");
        _;
    }

    function getCurrencyBalance() external view onlyOwner returns(uint) {
        return address(this).balance;
    }

    function proxyBid() external payable onlyOwner {
        bidAmount = msg.value;
        auction.bid{value: bidAmount}();
    }

    function mamkinHuyakerIdeUboi() external {
        auction.refund();
    }

    receive() external payable {
        if (bidAmount <= auction.getCurrencyBalance()) {
            auction.refund();
        }
    }

    function withdraw() external onlyOwner {
        owner.transfer(address(this).balance);
    }
}