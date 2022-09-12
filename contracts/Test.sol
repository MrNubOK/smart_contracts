// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Ownable {
     address public owner;

    constructor(address _owner) {
        owner = _owner == address(0) ? msg.sender : _owner;
    }

    modifier onlyOwner() { 
        require(owner == msg.sender, "not an owner");
        _;
    } 

    function withdraw(address payable _to) public virtual onlyOwner {
        _to.transfer(address(this).balance);
    }
}

abstract contract Balances is Ownable {
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function withdraw(address payable _to) public virtual override onlyOwner {
        _to.transfer(address(this).balance);
    }
}

contract Inherit is Ownable, Balances {
    constructor() Ownable(msg.sender) {
        //
    }

    function withdraw(address payable _to) public override(Ownable, Balances) onlyOwner {
        super.withdraw(_to);
    }
}
