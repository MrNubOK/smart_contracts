// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Event {
    address owner; 

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        pay();
    }

    event Paid(address _from, uint amount, uint timestamp);

    function pay() public payable {
        emit Paid(msg.sender, msg.value, block.timestamp);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not an owner");
        _;
    }

    function withdraw(address payable _to) external onlyOwner {
        _to.transfer(address(this).balance);
    }
}