// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Payments {
    struct Payment {
        uint value;
        uint timestamp;
        address from;
        string message;
    }

    struct Balance {
        uint totalPayments;
        mapping (uint => Payment) payments;
    }

    mapping (address => Balance) public balances;

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getPayment(address _addresss, uint _index) public view returns(Payment memory) {
        return balances[_addresss].payments[_index];
    }

    function pay(string memory _message) public payable {
        uint paymentsNum = balances[msg.sender].totalPayments;
        balances[msg.sender].totalPayments++;

        Payment memory _payment = Payment(
            msg.value,
            block.timestamp,
            msg.sender,
            _message
        );

        balances[msg.sender].payments[paymentsNum] = _payment;
    } 
}