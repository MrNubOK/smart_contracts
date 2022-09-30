// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MyContract {
    address public sender;
    uint public value;
    uint public at;
    address secondContract;

    constructor(address _address) {
        secondContract = _address;
    }

    function delCallGetData() external payable {
        (bool success, ) = secondContract.delegatecall(
            abi.encode(AnotherContract.getData.selector)
        );

        require(success, "failed");
    }
}

contract AnotherContract {
    address public sender;
    uint public value;
    uint public at;

    event Received(address, uint);

    function getData() external payable {
        sender = msg.sender;
        value = msg.value;
        at = block.timestamp;
        emit Received(msg.sender, msg.value);
    }
}