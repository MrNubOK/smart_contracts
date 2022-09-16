// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC20 {
    function name() external view returns(string memory);

    function symbol() external view returns(string memory);

    function decimals() external pure returns(uint);

    function totalSupply() external view returns(uint);

    function balanceOf(address _owner) external view returns (uint);

    function transfer(address _to, uint _value) external returns(bool);

    function allowance(address _owner, address _spender) external view returns (uint);

    function approve(address spender, uint amount) external;

    function transferFrom(address _from, address _to, uint256 _value) external returns (bool);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}