// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC721/IERC721.sol)

pragma solidity ^0.8.0;

import "./IERC721Metadata.sol";

contract ERC721 is IERC721Metadata {
    string public name;
    string public symbol;

    mapping(uint => address) public _owners;
    mapping(address => uint) public _balances;
    mapping(uint => address) public _approved;
    mapping(address => mapping(address => bool)) _operators;

    modifier tokenMinted(uint tokenId) {
        require(exists(tokenId), "doesn't exists");
        _;
    }

    function getBasePath() public pure returns(string memory) {
        return "https://test.com/path";
    }

    function tokenURI(uint256 tokenId) external view tokenMinted(tokenId) returns(string memory) {
        return string(abi.encodePacked(getBasePath(), tokenId));
    }

    function approve(address to, uint256 tokenId) external tokenMinted(tokenId) {
        require(ownerOf(tokenId) == msg.sender, "you're not an owner");

        _approved[tokenId] = to;

        emit Approval(msg.sender, to, tokenId);
    } 

    function getApproved(uint256 tokenId) public view returns (address operator) {
        return _approved[tokenId];
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external tokenMinted(tokenId) {
        address owner = ownerOf(tokenId);

        require(owner != address(0), "zero address");
        require(
            owner == msg.sender ||
            getApproved(tokenId) == msg.sender ||
            isApprovedForAll(owner, msg.sender),
            "not allowed to manage token" 
        );

        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external tokenMinted(tokenId) {
        address owner = ownerOf(tokenId);

        require(owner != address(0), "zero address");
        require(
            owner == msg.sender ||
            getApproved(tokenId) == msg.sender ||
            isApprovedForAll(owner, msg.sender)
        );

        _transfer(from, to, tokenId);
    }

    function setApprovalForAll(address operator, bool isApproved) external {
        _operators[msg.sender][operator] = isApproved;

        emit ApprovalForAll(msg.sender, operator, isApproved);
    }

    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        return _operators[owner][operator];
    }

    function exists(uint tokenId) public view returns(bool) {
        return _owners[tokenId] != address(0);
    }

    function ownerOf(uint256 tokenId) public view returns (address owner) {
        return _owners[tokenId];
    }

    function balanceOf(address owner) public view returns (uint256 balance) {
        return _balances[owner];
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        address owner = _owners[tokenId];

        delete _approved[tokenId];
        _owners[tokenId] = to;
        _balances[owner]--;
        _balances[to]++;

        emit Transfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) external view returns (bool) {
        return true;
    }
}