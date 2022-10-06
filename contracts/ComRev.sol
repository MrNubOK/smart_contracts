// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ComRev {
    address public owner;
    address[] public options = [
        0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
        0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC,
        0x90F79bf6EB2c4f870365E785982E1f101E93b906
    ];
    bool stopped;

    mapping(address => bytes32) public commits;
    mapping(address => uint) public votes;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "you're not an owner");
        _;
    }

    function commitVote(bytes32 _hashedVote) external {
        require(!stopped, "vote was been stoped");
        require(commits[msg.sender] == bytes32(0), "vote was been spent");

        commits[msg.sender] = _hashedVote;

        // ethers.utils.solidityKeccak256(
        //     ['address', 'bytes32', 'address'], 
        //     [
        //         '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', 
        //         '0x6b65790000000000000000000000000000000000000000000000000000000000', 
        //         '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'
        //     ]
        // );
        //0x887804b3647212992bd33c2dda161df7757c2f7c6eecc575835740beb9c22f28
        //ethers.utils.formatBytes32String('key') 
    }

    function stopVoting() external onlyOwner {
        require(!stopped, "already stopped");
        stopped = true;
    }

    function revealVote(address _option, bytes32 _key) external {
        require(stopped, "voting is active");

        bytes32 commit = keccak256(abi.encodePacked(_option, _key, msg.sender));
        require(commit == commits[msg.sender]);

        delete commits[msg.sender];

        votes[_option]++;
    }
}