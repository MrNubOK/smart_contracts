// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Ext.sol";

contract UsingLibsContract {
    using StrExt for string;

    function compareStr(string memory str1, string memory str2) public pure returns(bool) {
        return StrExt.compareStr(str1, str2);
    }
}