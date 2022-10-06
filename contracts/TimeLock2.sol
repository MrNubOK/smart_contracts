// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TimeLock2 {
    string public message;
    address public owner;
    uint public amount;
    uint256 constant MIN_DELAY = 10;
    uint256 constant MAX_DELAY = 1 weeks;

    event Queued(bytes32 txId);
    event Discarded(bytes32 txId);
    event Executed(bytes32 txId);

    mapping (bytes32 => bool) public queue;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function demo(string memory _msg) external payable {
        message = _msg;
        amount = msg.value;
    }

    function prepareData(string memory _str) external pure returns(bytes memory) {
        return abi.encode(_str);
    }

    function delayTimestamp() external view returns(uint) {
        return block.timestamp + 60;
    }

    function addToQueue(
        address _to,
        string memory _func,
        bytes memory _data,
        uint _value,
        uint _timestamp
    ) external onlyOwner returns(bytes32) {
        require(
            _timestamp > block.timestamp + MIN_DELAY && 
            _timestamp < block.timestamp + MAX_DELAY,
            "invalid date"
        );

        bytes32 txId = keccak256(abi.encodePacked(
            _to,
            _func,
            _data, 
            _value,
            _timestamp
        ));

        require(!queue[txId], "Already queued");

        queue[txId] = true;

        emit Queued(txId);

        return txId;
    }

    function discard(bytes32 txId) external onlyOwner {
        require(queue[txId], "not queued");
        delete queue[txId];

        emit Discarded(txId);
    }

    function execute(
        address _to,
        string memory _func,
        bytes memory _data,
        uint _value,
        uint _timestamp
    ) external payable onlyOwner returns(bytes memory) {
        require(_timestamp > block.timestamp, "Too early");
        require(_timestamp + MAX_DELAY > block.timestamp, "Too late");
        require(_value == msg.value, "Incorrect sum");

        bytes32 txId = keccak256(abi.encodePacked(
            _to,
            _func,
            _data, 
            _value,
            _timestamp
        ));

        require(queue[txId], "Not queued");

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

        (bool success, bytes memory response) = _to.call{value: _value}(data);
        require(success, "Failed");

        emit Executed(txId);
        return response;
    }
}