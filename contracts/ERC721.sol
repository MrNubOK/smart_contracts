// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './IERC721Metadata.sol';
import './IERC721Receiver.sol';

abstract contract ERC721 is IERC721Metadata {
    string public name;
    string public symbol;
    mapping(address => uint) _balances;
    mapping(uint => address) _owners;
    mapping(uint => address) _tokenApprovals;
    mapping(address => mapping(address => bool)) _operatorApprovals;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    modifier requireMinted(uint tokenId) {
        require(exists(tokenId), "Token doesn't exists");
        _;
    }

    function exists(uint tokenId) public view returns(bool) {
        return _owners[tokenId] != address(0);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external payable requireMinted(_tokenId) {
        require(isApprovedOrOwner(_tokenId, msg.sender), "not an owner or approved");

        _transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) public payable requireMinted(_tokenId) {
        address owner = ownerOf(_tokenId);
        require(_approved != owner, "cannot approve to self");
        require(owner == msg.sender || isApprovedForAll(owner, msg.sender), "you're not nft owner");

        _tokenApprovals[_tokenId] = _approved;

        emit Approval(owner, _approved, _tokenId);
    }

    function saveTransferFrom(address _from, address _to, uint256 _tokenId) external requireMinted(_tokenId) {
        require(isApprovedOrOwner(_tokenId, msg.sender), "not an owner or approved");

        safeTransfer(_from, _to, _tokenId);
    }

    function isApprovedOrOwner(uint _tokenId, address _spender) private view returns(bool) {
        address owner = ownerOf(_tokenId);

        require(
            _spender == owner ||
            isApprovedForAll(owner, _spender) ||
            getApproved(_tokenId) == _spender,
            "not an owner or approved"
        );
    }

    function safeTransfer(address _from, address _to, uint256 _tokenId) internal {
        _transfer(_from, _to, _tokenId);

        require(checkOnERC721Received(_from, _to, _tokenId), "non erc721 receiver");
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        require(ownerOf(_tokenId) == _from, "not an owner");
        require(_to != address(0), "to cannot be zero");

        beforeTokenTransfer(_from, _to, _tokenId);

        _balances[_from]--;
        _balances[_from]++;
        _owners[_tokenId] = _to;

        afterTokenTransfer(_from, _to, _tokenId);

        emit Transfer(_from, _to, _tokenId);
    }

    function checkOnERC721Received(address _from, address _to, uint256 _tokenId) private returns(bool) {
        if (_to.code.length > 0) {
            try IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, bytes("")) returns(bytes4 ret) {
                return ret == IERC721Receiver.onERC721Received.selector;
            } catch(bytes memory reason) {
                if (reason.length == 0) {
                    revert("Non erc721 receiver");
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    function beforeTokenTransfer(address _from, address _to, uint _tokenId) internal {}

    function afterTokenTransfer(address _from, address _to, uint _tokenId) internal {}

    function balanceOf(address _owner) external view returns (uint256) {
        require(_owner != address(0), "zero address");

        return _balances[_owner];
    }

    function ownerOf(uint _tokenId) public view requireMinted(_tokenId) returns(address) {
        return _owners[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) public view returns(bool) {
        return _tokenApprovals[_owner][_operator];
    }

    function getApproved(uint256 _tokenId) public view returns(address) {
        return _tokenApprovals[_tokenId];
    }
}