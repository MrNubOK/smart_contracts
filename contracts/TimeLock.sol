// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TimeLock {
    uint constant MINIMUM_DELAY = 10;
    uint constant MAXIMUM_DELAY = 1 days;
    address public owner;
    string message;
    uint amount;

    mapping (bytes32 => bool) public queue;

    modifier onlyOwner() {
        require(msg.sender == owner, "not an owner");
        _;
    }

    event Queued(bytes32 txId);
    event Discarded(bytes32 txId);
    event Executed(bytes32 txId);

    constructor() {
        owner = msg.sender;
    }

    function demo(string memory _msg) external payable {
        message = _msg;
        amount = msg.value;
    }

    function getNextTimestamp() external view returns(uint) {
        return block.timestamp + 60;
    }

    function prepareData(string calldata _msg) external pure returns(bytes memory) {
        return abi.encode(_msg);
    }

    function addToQueue(
        address _to,
        string calldata _func,
        bytes calldata _data, 
        uint _value,
        uint _timestamp
    ) external onlyOwner returns(bytes32) {
        require(_timestamp > block.timestamp + MINIMUM_DELAY && _timestamp < block.timestamp + MAXIMUM_DELAY, "Incorrect date");

        bytes32 txId = keccak256(abi.encode(
            _to, 
            _func,
            _data,
            _value,
            _timestamp 
        ));

        require(!queue[txId], "already queued");

        emit Queued(txId);

        queue[txId] = true;

        return txId;
    }

    function discard(bytes32 _txId) external onlyOwner {
        require(queue[_txId], "not queued");
        delete queue[_txId];

        emit Discarded(_txId);
    }

    function execute(
        address _to,
        string calldata _func,
        bytes calldata _data, 
        uint _value,
        uint _timestamp
    ) external payable onlyOwner returns(bytes memory) {
        require(_timestamp < block.timestamp, "Too early"); 
        require(_timestamp + MAXIMUM_DELAY > block.timestamp, "Too late");

        bytes32 txId = keccak256(abi.encode(
            _to, 
            _func,
            _data,
            _value,
            _timestamp 
        ));

        require(queue[txId], "not queued");

        delete queue[txId];

        bytes memory data;
        if (bytes(_func).length > 0) {
            data = abi.encodePacked(
                bytes4(keccak256(bytes(_func))),
                _data
            );
        } else {
            data = _data;
        }

        (bool success, bytes memory resp) = _to.call{value: _value}(data);
        require(success, "Failed");

        emit Executed(txId);

        return resp;
    }
}