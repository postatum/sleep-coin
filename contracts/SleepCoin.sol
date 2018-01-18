pragma solidity ^0.4.18;

import './Ownable.sol';

contract SleepCoin is Ownable {
    /* This creates a map with all balances */
    mapping (address => uint256) public balances;

    /* Get balance of a particular address */
    function getBalance(address _addr) public onlyOwner view returns (uint256) {
        return balances[_addr];
    }

    /* Mint coins */
    function mint(address _to, uint256 _value) public onlyOwner {
        require(balances[_to] + _value >= balances[_to]);
        balances[_to] += _value;
    }

    /* Send coins */
    function transfer(address _from, address _to, uint256 _value) public onlyOwner {
        require(balances[_from] >= _value);
        require(balances[_to] + _value >= balances[_to]);
        balances[_from] -= _value;
        balances[_to] += _value;
    }
}
