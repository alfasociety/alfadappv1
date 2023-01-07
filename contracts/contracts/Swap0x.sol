// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IMulticall {
    function multicall(bytes[] calldata data)
        external
        payable
        returns (bytes[] memory results);
}

abstract contract Multicall is IMulticall {
    function _getRevertMsg(bytes memory _returnData)
        internal
        pure
        returns (string memory)
    {
        // If the _res length is less than 68, then the transaction failed silently (without a revert message)
        if (_returnData.length < 68) return "Transaction reverted silently";

        assembly {
            // Slice the sighash.
            _returnData := add(_returnData, 0x04)
        }
        return abi.decode(_returnData, (string)); // All that remains is the revert string
    }

    function multicall(bytes[] calldata data)
        public
        payable
        override
        returns (bytes[] memory results)
    {
        results = new bytes[](data.length);
        for (uint256 i = 0; i < data.length; i++) {
            (bool success, bytes memory result) = address(this).delegatecall(
                data[i]
            );

            require(success, _getRevertMsg(result));
            results[i] = result;
        }
    }
}

contract Swap0x is Multicall {
    receive() external payable {}

    function swap(
        address sellToken,
        address buyToken,
        uint256 sellAmount,
        address allowanceTarget,
        address payable swapTarget,
        bytes calldata swapData
    ) public payable {
        if (sellToken != address(0)) {
            IERC20(sellToken).transferFrom(
                msg.sender,
                address(this),
                sellAmount
            );
        } else {
            require(msg.value >= sellAmount, "Swap0x: ETH value invalid");
        }

        if (allowanceTarget != address(0) && sellToken != address(0)) {
            require(
                IERC20(sellToken).approve(allowanceTarget, type(uint256).max),
                "Swap0x: allowance failed"
            );
        }

        uint256 buyTokenBalanceBefore = 0;
        if (buyToken != address(0)) {
            buyTokenBalanceBefore = IERC20(buyToken).balanceOf(address(this));
        } else {
            buyTokenBalanceBefore = address(this).balance;
        }

        if (sellToken != address(0)) {
            (bool success, bytes memory retdata) = swapTarget.call(swapData);
            require(success, _getRevertMsg(retdata));
        } else {
            (bool success, bytes memory retdata) = swapTarget.call{
                value: sellAmount
            }(swapData);
            require(success, _getRevertMsg(retdata));
        }

        if (buyToken != address(0)) {
            uint256 buyTokenBalanceAfter = IERC20(buyToken).balanceOf(
                address(this)
            );
            uint256 boughtAmount = buyTokenBalanceAfter - buyTokenBalanceBefore;
            IERC20(buyToken).transfer(msg.sender, boughtAmount);
        } else {
            uint256 buyTokenBalanceAfter = address(this).balance;
            uint256 boughtAmount = buyTokenBalanceAfter - buyTokenBalanceBefore;
            payable(msg.sender).transfer(boughtAmount);
        }
    }
}
