// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract StorageType {
    function work(string calldata _str) external pure returns(bytes32 _el1) {
        assembly {
            // first 4 bytes - hashed signature
            // whenItStarted := calldataload(4)
            // dataAboutString := calldataload(add(4,32))
            // ourString := calldataload(add(4,64))
            _el1 := calldataload(add(4,64))
        }
    }
}