// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MerkleTree {
    bytes32[] public hashes;
    string[4] transactions = [
        "TX1: 1 => 2",
        "TX1: 2 => 3",
        "TX1: 3 => 1",
        "TX1: 1 => 4"
    ];

    //3: 
    //5:
    //root:  0xf1acc62dd99a3821dba5aecf234aaf0457a931b07da7c4c0117af8e2be0ade58

    constructor() {
        uint count = transactions.length;
        for (uint i = 0; i < count; i++) {
            hashes.push(
                keccak256(
                    abi.encodePacked(transactions[i])
                )
            );
        }

        uint offset = 0;
        while (count > 0) {
            for (uint i = 0; i < count - 1; i += 2) {
                hashes.push(
                    keccak256(
                        abi.encodePacked(hashes[offset + i], hashes[offset + i + 1])
                    )
                );
            }

            offset += count;
            count = count / 2;
        }
    }

    function verify(string memory transaction, uint index, bytes32 root, bytes32[] memory proof) public pure returns(bool) {
        bytes32 hash = keccak256(abi.encodePacked(transaction));

        //0 1 2 3 
        //
        for (uint i = 0; i < proof.length; i++) {
            bytes32 element = proof[i];

            if (index % 2 == 0) {
                hash = keccak256(abi.encodePacked(hash, element));
            } else {
                hash = keccak256(abi.encodePacked(element, hash));
            }

            index = index / 2;
        }

        return hash == root;
    }   
}