// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract AucEngine {
    address payable public owner;
    uint constant public DURATION = 2 days;
    uint constant FEE = 10;
   
    struct Auction {
        string item;
        address payable seller;
        uint startPrice;
        uint finalPrice;
        uint discountRate;
        uint startsAt;
        uint endsAt;
        bool ended;
    }

    Auction[] public auctions;

    constructor() {
        owner = payable(msg.sender);
    }

    event AuctionCreated(uint index, string item, uint startPrice, uint duration);
    event AuctionEnded(uint index, string item, uint price, address winner);

    function createAuction(string calldata _item, uint _startPrice, uint _discountRate, uint _duration) external {
        uint duration = _duration != 0 ? _duration : DURATION;

        require(duration * _discountRate < _startPrice, "Incorrect starting price");

        Auction memory action = Auction({
            item: _item,
            seller: payable(msg.sender),
            startPrice: _startPrice,
            finalPrice: _startPrice,
            discountRate: _discountRate,
            startsAt: block.timestamp,
            endsAt: block.timestamp + duration,
            ended: false
        });

        auctions.push(action);

        emit AuctionCreated(auctions.length - 1, _item, _startPrice, duration);
    }

    function getPrice(uint _index) public view returns(uint) {
        Auction memory auction = auctions[_index];
        if (auction.ended) {
            return auction.finalPrice;
        }
        return auction.startPrice - auction.discountRate * (block.timestamp - auction.startsAt);
    }

    function buy(uint _index) external payable {
        Auction storage auction = auctions[_index];
        require(!auction.ended, "Auction stopped");
        require(auction.endsAt > block.timestamp, "Auction stopped");

        uint price = getPrice(_index);
        require(msg.value > price, "Not enough funds");

        auction.finalPrice = price;
        auction.endsAt = block.timestamp;
        auction.ended = true;

        uint refund = msg.value - price;
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }

        auction.seller.transfer(price - ((price * FEE) / 100));
        emit AuctionEnded(_index, auction.item, price, msg.sender);
    } 
}