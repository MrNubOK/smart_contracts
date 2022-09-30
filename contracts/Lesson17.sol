// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MyContract {
    address targetContract;
    event Response(bytes response);

    constructor(address _targetContract) {
        targetContract = _targetContract;
    }

    function callReceive() external payable {
        (bool result, ) = targetContract.call{value: msg.value}("");
        require(result, "Transaction failed");
    }

    function callSetName(string memory name) external returns(bool) {
        (bool result, bytes memory response) =  targetContract.call(
            abi.encodeWithSignature("setName(string)", name)
        );

        require(result, "can't send name");

        emit Response(response);
    }
}

contract AnotherContract {
    string public name;
    mapping (address => uint) public balances;

    function setName(string calldata _name) external {
        name = _name;
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
    }
}