// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact castives@gmail.com
contract EthanToken is ERC20, ERC20Burnable, Pausable, Ownable {

    uint256 private _totalSupplyHardLimit;

    constructor() ERC20("EthanToken", "ethw") {
        // Set total suply hard limit to 1 billion token. Not possible to mint more than this number.
        _totalSupplyHardLimit = 1000000000*1e18;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        if(super.totalSupply()+amount>_totalSupplyHardLimit){
            emit ReachTotalSupplyHardLimit();
            revert("Not possible to mint tokens more than 1b hard limit");
        }
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    /**
    * @dev emit this event when the hard limit is reached
    */
    event ReachTotalSupplyHardLimit();
}
