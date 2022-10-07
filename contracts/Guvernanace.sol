// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './IERC201.sol';

contract Governance {
    IERC201 public token;

    struct ProposalVote {
        uint againstVotes;
        uint forVotes;
        uint abstainVotes;
        mapping(address => bool) hasVoted;
    }

    struct Proposal {
        uint votingStarts;
        uint votingEnds;
        bool executed;
    }

    mapping(bytes32 => Proposal) public proposals;
    mapping(bytes32 => ProposalVote) public proposalVotes;

    uint public constant VOTING_DELAY = 10;
    uint public constant VOTING_DURATION = 1 days;

    enum ProposalState { Pending, Active, Succeded, Defeated, Executed }

    constructor(IERC201 _token) {
        token = _token;
    }

    function propose(
        address _to,
        uint _value,
        string calldata _func,
        bytes calldata _data,
        string calldata _description
    ) external returns(bytes32) {
        require(token.balanceOf(msg.sender) > 0, "not enough tokens");

        bytes32 proposalId = getProposalId(
            _to, _value, _func, _data, _description
        );

        require(proposals[proposalId].votingStarts == 0, "proposal already exists");

        proposals[proposalId] = Proposal({
            votingStarts: block.timestamp + VOTING_DELAY,
            votingEnds: block.timestamp + VOTING_DELAY + VOTING_DURATION,
            executed: false
        });

        return proposalId;
    }

    function vote(bytes32 proposalId, uint8 voteType) external {
        require(state(proposalId) == ProposalState.Active, "invalid state");
        uint votingPower = token.balanceOf(msg.sender);
        require(votingPower > 0, "not enough tokens");

        Proposal storage proposal = proposals[proposalId];
        ProposalVote storage proposalVote = proposalVotes[proposalId];
    
        require(proposal.votingStarts > 0, "Proposal not found");
        require(!proposalVotes[proposalId].hasVoted[msg.sender], "already voted");

        if (voteType == 0) {
            proposalVote.againstVotes += votingPower;
        } else if (voteType == 1) {
            proposalVote.forVotes += votingPower;
        } else {
            proposalVote.abstainVotes += votingPower;
        }

        proposalVote.hasVoted[msg.sender] = true;
    }

    function state(bytes32 proposalId) public view returns(ProposalState) {
        Proposal storage proposal = proposals[proposalId];
        ProposalVote storage proposalVote = proposalVotes[proposalId];

        require(proposal.votingStarts > 0, "Proposal not found");

        if (proposal.executed) {
            return ProposalState.Executed;
        }

        if (block.timestamp >= proposal.votingStarts && block.timestamp < proposal.votingEnds) {
            return ProposalState.Active;
        }

        if (block.timestamp < proposal.votingStarts) {
            return ProposalState.Pending;
        } 

        if (proposalVote.forVotes > proposalVote.againstVotes) {
            return ProposalState.Succeded;
        } else {
            return ProposalState.Defeated;
        }
    }

    function execute(
        address _to,
        uint _value,
        string calldata _func,
        bytes calldata _data,
        string calldata _description
    ) external returns(bytes memory) {
        bytes32 proposalId = getProposalId(_to, _value, _func, _data, _description);

        require(state(proposalId) == ProposalState.Succeded, "invalid state");

        Proposal storage proposal = proposals[proposalId];
        proposal.executed = true;

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

        return response;
    }

    function getProposalId(
        address _to,
        uint _value,
        string calldata _func,
        bytes calldata _data,
        string calldata _description
    ) private pure returns(bytes32) {
        return keccak256(
            abi.encode(_to, _value, _func, _data, _description)
        );
    }
}