// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}

contract SendBalance {
    receive() external payable {

    }

    function destroy(address payable _receiver) external {
        selfdestruct(_receiver);
    }
}