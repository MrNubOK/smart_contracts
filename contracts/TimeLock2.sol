// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TimeLock2 {
    string public message;
    address[] public owners;
    mapping(address => bool) isOwner;
    mapping(bytes32 => Transaction) public txs;
    uint public amount;
    uint256 constant MIN_DELAY = 10;
    uint256 constant MAX_DELAY = 1 weeks;
    uint public constant CONFIRMATIONS_REQUIRED = 2;
    
    mapping (bytes32 => bool) public queue;
    
    struct Transaction {
        bytes32 uid;
        address to;
        uint value;
        bytes data;
        bool executed;
        uint confirmations;
    }

    mapping(bytes32 => mapping(address => bool)) public confirmations;

    event Queued(bytes32 txId);
    event Discarded(bytes32 txId);
    event Executed(bytes32 txId);


    constructor(address[] memory addresses) {
        require(addresses.length >= CONFIRMATIONS_REQUIRED, "not enough owners");

        for (uint i = 0; i < addresses.length; i++) {
            address nextOwner = addresses[i];

            require(nextOwner != address(0), "An owner can't be zero address");
            require(!isOwner[nextOwner], "Not unique owner");

            owners.push(nextOwner);
            isOwner[nextOwner] = true;
        }
    }

    modifier onlyOwner {
        require(isOwner[msg.sender], "you're not an owner");
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

        txs[txId] = Transaction({
            uid: txId,
            to: _to,
            value: _value,
            data: _data,
            executed: false,
            confirmations: 0
        });

        require(!queue[txId], "Already queued");

        queue[txId] = true;

        emit Queued(txId);

        return txId;
    }

    function discard(bytes32 txId) external onlyOwner {
        require(queue[txId], "not queued");
        delete queue[txId];
        delete txs[txId];

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

        Transaction storage transaction = txs[txId];

        require(transaction.confirmations >= CONFIRMATIONS_REQUIRED, "Not enough confirmations");

        delete queue[txId];
        transaction.executed = true;

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

    function confirm(bytes32 txId) external onlyOwner {
        require(queue[txId], "not queued");
        require(!confirmations[txId][msg.sender], "Already confirmed");

        Transaction storage transaction = txs[txId];

        transaction.confirmations++;
        confirmations[txId][msg.sender] = true;
    }

    function cancelConfirmation(bytes32 txId) external onlyOwner {
        require(queue[txId], "not queued");
        require(confirmations[txId][msg.sender], "Transaction was'nt confirmed");

        Transaction storage transaction = txs[txId];

        transaction.confirmations--;
        confirmations[txId][msg.sender] = false;
    }
}