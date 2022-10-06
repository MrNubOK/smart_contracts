// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CommitReveal {
    address[] public options = [
        0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65,
        0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc,
        0x976EA74026E726554dB657fA54763abd0C3a0aa9
    ];

    bool stopped;

    address public owner;
    mapping(address => bytes32) commits;
    mapping(address => uint) votes;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "You're not an owner");
        _;
    }

    function vote(bytes32 voteHash) external {
        require(!stopped, "voting was been stopped");
        require(commits[msg.sender] == bytes32(0), "no double votes");

        commits[msg.sender] = voteHash; 
    }

    function openVote(address _option, bytes32 _key) external {
        require(stopped, "voting is active");

        bytes32 hash = keccak256(abi.encodePacked(_option, _key, msg.sender));

        require(commits[msg.sender] == hash);

        delete commits[msg.sender];
        votes[_option]++;
    }

    function stop() external onlyOwner {
        require(!stopped, "voting was been stopped");
        stopped = true;
    }

    // ethers.utils.formatBytes32String('test')
    // 0x7465737400000000000000000000000000000000000000000000000000000000

    //0x560431b5c2ab6933a822ebd4abb5ee31768f3083c24013df7a7e34fb78207e29
    ethers.utils.solidityKeccak256(
        ['address', 'bytes32', 'address'], 
        ['0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', '0x7465737400000000000000000000000000000000000000000000000000000000', '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4']
    )
}