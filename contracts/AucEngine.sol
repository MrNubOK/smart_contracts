// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract AucEngine {
    address public owner;
    uint constant DURATION = 2 days;
    uint constant FEE = 10;

    struct Auction {
        address payable seller;
        uint startingPrice;
        uint finalPrice;
        uint startsAt;
        uint endsAt;
        uint discountRate;
        string item;
        bool stopped;
    }

    Auction[] public auctions;

    event AuctionCreated(uint index, string item, uint startingPrice, uint duration);
    event AuctionEnded(uint index, string item, uint price, address winner);

    constructor() {
        owner = msg.sender;
    }

    function createAuction(uint _startingPrice, uint _discountRate, string calldata _item, uint _duration) external {
        uint duration = _duration != 0 ? _duration : DURATION;

        require(_startingPrice >= _discountRate * duration, "Incorrect starting price");

        Auction memory newAction = Auction({
            seller: payable(msg.sender),
            startingPrice: _startingPrice,
            finalPrice: _startingPrice,
            discountRate: _discountRate,
            startsAt: block.timestamp,
            endsAt: block.timestamp + duration,
            item: _item,
            stopped: false
        });

        auctions.push(newAction);

        emit AuctionCreated(auctions.length - 1, _item, _startingPrice, _duration);
    }

    function getPrice(uint index) public view returns(uint) {
        Auction memory cAuction = auctions[index];
        require(!cAuction.stopped, "stopped");
        uint elapsed = block.timestamp - cAuction.startsAt;
        uint discount = cAuction.discountRate * elapsed;
        return cAuction.startingPrice - discount;
    }

    function buy(uint index) external payable {
        Auction memory cAuction = auctions[index];
        require(!cAuction.stopped, "stopped");
        require(cAuction.endsAt < block.timestamp, "ended");
        uint price = getPrice(index);
        require(msg.value >= price, "not enough funds!");
        cAuction.stopped = true;
        cAuction.finalPrice = price;
        uint refund = msg.value - price;
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }
        cAuction.seller.transfer(price - ((price * FEE) / 100));
        emit AuctionEnded(index, cAuction.item, price, msg.sender);
    }
}