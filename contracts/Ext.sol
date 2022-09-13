// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library StrExt {
    function compareStr(string memory str1, string memory str2) public pure returns(bool) {
        return keccak256(abi.encode(str1)) == keccak256(abi.encode(str2));
    }
}