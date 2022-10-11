// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Proxy {
    address public implementation;
    uint public x;

    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == msg.sender, "You're not an owner");
        _;
    }

    function setImplementation(address newImplementation) external onlyOwner {
        implementation = newImplementation;
    }

    function delegate(address _imp) internal virtual {
        assembly {
            let ptr := mload(0x40)

            // (1) copy incoming call data
            calldatacopy(ptr, 0, calldatasize())

            // (2) forward call to logic contract
            let result := delegatecall(gas(), _imp, ptr, calldatasize(), 0, 0)
            let size := returndatasize()

            // (3) retrieve return data
            returndatacopy(ptr, 0, size)

            // (4) forward return data back to caller
            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    } 

    fallback() external payable {
        delegate(implementation);
    }
}

contract V1 {
    address public implementation;
    uint public x;

    function inc() external {
        x += 1;
    }

    function encInc() external pure returns(bytes memory) {
        return abi.encodeWithSelector(this.inc.selector);
    }

    function encX() external pure returns(bytes memory) {
        return abi.encodeWithSelector(this.x.selector);
    }
}

contract V2 {
    address public implementation;
    uint public x;

    function inc() external {
        x += 1;
    }

    function dec() external {
        x -= 1;
    }

    function encInc() external pure returns(bytes memory) {
        return abi.encodeWithSelector(this.inc.selector);
    }

     function encDec() external pure returns(bytes memory) {
        return abi.encodeWithSelector(this.dec.selector);
    }

    function encX() external pure returns(bytes memory) {
        return abi.encodeWithSelector(this.x.selector);
    }
}