// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC20.sol";

contract ERC20 is IERC20 {
    uint totalTokens;
    address owner;
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowances;  
    string _name;
    string _symbol;
    
    modifier enoughTokens(address _from, uint _amount) {
        require(balanceOf(_from) >= _amount, "not enough tokens!");
        _;
    } 

    modifier onlyOwner {
        require(msg.sender == owner, "you're not an owner");
        _;
    }

    constructor(string memory name_, string memory symbol_, uint _initialSupply, address _store) {
        owner = msg.sender;
        _name = name_;
        _symbol = symbol_;
        mint(_initialSupply, _store);
    }

    function burn(address _addresss, uint amount) public onlyOwner {
        _beforeTransfer(msg.sender, address(0), amount);
        balances[_addresss] -= amount;
        totalTokens -= amount;
    }
 
    function name() public view returns(string memory) {
        return _name;
    }

    function symbol() public view returns(string memory) {
        return _symbol;
    }

    function decimals() external pure returns(uint) {
        return 18;
    }

    function totalSupply() external view returns(uint) {
        return totalTokens;
    }

    function balanceOf(address _owner) public view returns (uint) {
        return balances[_owner];
    }

    function transfer(address _to, uint _value) external enoughTokens(msg.sender, _value) returns(bool) {
        _beforeTransfer(msg.sender, _to, _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function mint(uint _initialSupply, address _store) public onlyOwner {
        balances[_store] = _initialSupply;
        totalTokens += _initialSupply;
        emit Transfer(address(0), _store, _initialSupply);
    }

    function allowance(address _owner, address _spender) public view returns (uint) {
        return allowances[_owner][_spender];
    }

    function approve(address spender, uint amount) public {
        _approve(msg.sender, spender, amount);
    }

    function _approve(address sender, address spender, uint amount) internal virtual {
       allowances[sender][spender] = amount;
       emit Approval(sender, spender, amount);
    }

    function transferFrom(address _from, address _to, uint256 _value) public enoughTokens(_from, _value) returns (bool) {
        _beforeTransfer(_from, _to, _value);

        allowances[_from][_to] -= _value;
        balances[_from] -= _value;
        balances[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function _beforeTransfer(address from, address to, uint amount) internal virtual {
        
    }
}