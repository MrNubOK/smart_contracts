// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Tasks {
    string public message;

    function pay(string memory _message) external payable {
        message = _message;
    }

    function callme() external view returns(address) {
        return msg.sender;
    } 

    function distribute(address[] calldata _addresses) external {
        uint count = _addresses.length;
        uint sum = address(this).balance / count;

        for (uint i = 0; i < count; i++) {
            (bool result, ) = _addresses[i].call{value: sum}("");
            require(result, "Failed");
        }
    } 
}