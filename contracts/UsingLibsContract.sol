// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Ext.sol";

contract UsingLibsContract {
    using StrExt for string;
    using ArrExt for uint[];

    function compareStr(string memory str1, string memory str2) public pure returns(bool) {
        return StrExt.compareStr(str1, str2);
    }

    function arrayHas(uint[] memory arr, uint item) public pure returns(bool) {
        return ArrExt.arrayHas(arr, item);
    }
}