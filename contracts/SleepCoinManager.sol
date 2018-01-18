pragma solidity ^0.4.18;

import './TeamControlled.sol';
import './SleepCoin.sol';

contract SleepCoinManager is TeamControlled {
    address public coinAddr;

    function SleepCoinManager(address _coinAddr) public {
        watchCoin(_coinAddr);
    }

    function watchCoin(address _coinAddr) public onlyTeam {
        if (coinAddr != _coinAddr) {
            coinAddr = _coinAddr;
        }
    }

    function mint(address _to, uint256 _value) public onlyTeam {
        SleepCoin coin = SleepCoin(coinAddr);
        coin.mint(_to, _value);
    }

    function mintSender(uint256 _value) public onlyTeam {
        mint(msg.sender, _value);
    }

    function getBalance(address _addr) public view returns (uint256) {
        SleepCoin coin = SleepCoin(coinAddr);
        return coin.getBalance(_addr);
    }

    function transfer(address _to, uint256 _value) public {
        SleepCoin coin = SleepCoin(coinAddr);
        coin.transfer(msg.sender, _to, _value);
    }
}
