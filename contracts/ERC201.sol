// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC201.sol";

contract ERC201 is IERC201 {
    string _name;
    string _symbols;
    uint _totalTokens;
    address payable owner;
    mapping(address => uint) _balances;
    mapping(address => mapping(address => uint)) _allowances;

    constructor(string memory name_, string memory symbols_, uint totalTokens_, address store) {
        owner = payable(msg.sender);
        _name = name_;
        _symbols = symbols_;
        mint(totalTokens_, store);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "you're not an owner");
        _;
    }

    function mint(uint newTokens, address store) public onlyOwner {
        _balances[store] += newTokens;
        _totalTokens += newTokens;
        emit Transfer(address(0), store, newTokens);
    }

    function burn(address _address, uint burntTokens) public onlyOwner {
        _balances[_address] -= burntTokens;
        _totalTokens -= burntTokens;
        emit Transfer(_address, address(0), burntTokens);
    }

    function name() public view returns(string memory) {
        return _name;
    }

    function symbol() external view returns(string memory) {
        return _symbols;
    }

    function decimals() external pure returns (uint8) {
        return 18;
    }

    function totalSupply() external view returns(uint) {
        return _totalTokens;
    }

    function balanceOf(address _owner) external view returns (uint256) {
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _value) external returns (bool) {
        _beforeTransfer(msg.sender, _value);
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) external returns (bool) {
        require(_allowances[_from][_to] >= _value, "not allowed");
        _beforeTransfer(msg.sender, _value);
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) external returns (bool) {
        _allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256) {
        return _allowances[_owner][_spender];
    }

    function _beforeTransfer(address from, uint256 value) internal virtual {
        require(_balances[from] >= value, "not enough funds");
    }
}

contract MDCToken is ERC201 {
    constructor(address store) ERC201("Medical Solutions", "MDC", 10000000, store) {}
}


contract MDCStore {
    address payable public owner;
    MDCToken public token;
    event Bought(uint amount, address buyer);
    event Sold(uint amount, address sold);

    constructor() {
        token = new MDCToken(address(this));
        owner = payable(msg.sender);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "you're not an owner");
        _;
    }

    receive() external payable {
        uint boughtTokens = msg.value; //1:1
        require(msg.value > 0, "Min count is 1 token");
        require(getStoreBalance() >= msg.value, "Not enough tokens in the store");

        token.transfer(msg.sender, boughtTokens);
        emit Bought(boughtTokens, msg.sender);
    }

    function sell(uint value) external {
        require(value > 0, "Min value is 1 token");
        require(token.balanceOf(address(this)) >= value, "not enogh tokens on the balance");

        require(token.allowance(address(this), msg.sender) >= value, "not enogh tokens allowed to sell");

        token.transferFrom(msg.sender, address(this), value);
        payable(msg.sender).transfer(value); //1:1
        
        emit Sold(value, msg.sender);
    }

    function withdrawComission() external onlyOwner {
        owner.transfer(1);
    }

    function getStoreBalance() private view returns(uint) {
        return token.balanceOf(address(this));
    }
}