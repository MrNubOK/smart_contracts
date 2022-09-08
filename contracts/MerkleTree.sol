// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MerkleTree {
    bytes32[] public hashes;
    string[4] transactions = [
        "TX: 1 => 2",
        "TX: 2 => 3",
        "TX: 3 => 1",
        "TX: 2 => 1"
    ];

    constructor() {
        uint count = transactions.length;

        for (uint i = 0; i < count; i++) {
            hashes.push(makeHash(transactions[i]));
        }

        uint offset = 0;
        while (count > 0) {
            for (uint i = 0; i < count - 1; i += 2) {
                hashes.push(keccak256(abi.encodePacked(hashes[offset + i], hashes[offset + i + 1])));
            }

            count = count / 2;
            offset += count;
        }
    }

    function verify(string memory transaction, uint index, bytes32 root, bytes32[] memory proof) public pure returns(bool) {
        bytes32 transactionHash = makeHash(transaction);
        for (uint i = 0; i < proof.length - 1; i++) {
            bytes32 element = proof[i];

            if (index % 2 == 0) {
                transactionHash = keccak256(abi.encodePacked(transactionHash, element));
            } else {
                transactionHash = keccak256(abi.encodePacked(element, transactionHash));
            }

            index = index / 2;
        }

        return transactionHash == root;
    }

    function encode(string memory input) public pure returns(bytes memory) {
        return abi.encodePacked(input);
    }

    function makeHash(string memory input) public pure returns(bytes32) {
        return keccak256(encode(input));
    }
}