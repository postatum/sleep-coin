var SleepCoinManager = artifacts.require('./SleepCoinManager.sol')
var SleepCoin = artifacts.require('./SleepCoin.sol')

module.exports = function (deployer, network, accounts) {
  var alice = accounts[0]
  var bob = accounts[1]
  var manager, coin

  return deployer
    .then(function () {
      return SleepCoin.new()
    })
    .then(function (instance) {
      coin = instance
      return SleepCoinManager.new()
    })
    .then(function (instance) {
      manager = instance
      return coin.transferOwnership(manager.address)
    })
    .then(function () { return manager.watchCoin(coin.address) })
    .then(function () { return manager.addMember(bob) })
    .then(function() {
      console.log('SleepCoin deployed at:', coin.address)
      console.log('SleepCoinManager deployed at:', manager.address)
    })
}
