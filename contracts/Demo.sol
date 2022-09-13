// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ILogger.sol";

contract Demo {
    ILogger logger;

    constructor(address _logger) {
        logger = ILogger(_logger);
    }

    function getPaymentData(address _from, uint _index) external view returns(uint) {
        return logger.getPaymentData(_from, _index);
    }

    receive() external payable {
        logger.logPayment(msg.sender, msg.value);
    }
}