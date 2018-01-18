var SleepCoinManager = artifacts.require("./SleepCoinManager.sol");
var SleepCoin = artifacts.require("./SleepCoin.sol");

module.exports = function(deployer, network, accounts) {
    var knight = accounts[0];
    var pony = accounts[1];
    var manager, coin;

    return deployer
        .then(function() {
            return SleepCoin.new();
        })
        .then(function(instance) {
            coin = instance;
            return SleepCoinManager.new();
        })
        .then(function(instance) {
            manager = instance;
            return coin.transferOwnership(manager.address);
        })
        .then(function() { return manager.watchCoin(coin.address); })
        .then(function() { return manager.addMember(pony); })
        .then(function() { return manager.mint(knight, 420); })
        .then(function() { return manager.mint(pony, 110); })
        .then(function() {
            console.log('TESTS >>>>>');
            console.log('Knight balance before', manager.getBalance(knight));
            console.log('Pony balance before', manager.getBalance(pony));
            console.log('Transfering 20 from knight to pony')
            return manager.transfer(pony, 20, {from: knight})
        })
        .then(function() {
            console.log('Knight balance after', manager.getBalance(knight));
            console.log('Pony balance after', manager.getBalance(pony));
            console.log('TESTS <<<<<');
        })
};
