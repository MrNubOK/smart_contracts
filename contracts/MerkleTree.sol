// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MerkleTree {
   bytes32[] public hashes;
   string[4] transactions = [
        "TX1: 1 => 2",
        "TX1: 2 => 3",
        "TX1: 3 => 4",
        "TX1: 4 => 1"
   ];

    constructor() {
        uint count = transactions.length;

        for (uint i = 0; i < count; i++) {

        } 
   }

    function makeHash(string memory input) public pure returns(bytes32) {
        return keccak256(abi.encodePacked(input));
    }
}