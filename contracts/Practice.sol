// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MyContract {
    address otherContract;
    event Response(bytes response);

    constructor(address _otherContract) {
        otherContract = _otherContract;
    }

    function callReceive() external payable {
        (bool success, ) = otherContract.call{value: msg.value}("");
        require(success, "Can't send funds");
        //transfer
        
    }

    function callSetName(string calldata _name) external {
        (bool success, bytes memory response) = otherContract.call(
            abi.encodeWithSignature("setName(string)", _name)           
        );

        require(success, "Can't send funds");

        emit Response(response);
    }
}

contract AnotherContract {
    string public name;
    mapping (address => uint) public balanaces;

    function setName(string calldata _name) external {
        name = _name;
    }

    receive() external payable {
        balanaces[msg.sender] += msg.value;
    }
}