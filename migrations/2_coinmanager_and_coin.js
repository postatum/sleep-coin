var SleepCoinManager = artifacts.require('./SleepCoinManager.sol')
var SleepCoin = artifacts.require('./SleepCoin.sol')

module.exports = function (deployer, network, accounts) {
  var alpha = accounts[0]
  var bravo = accounts[1]
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
    .then(function () { return manager.addMember(bravo) })
    .then(function () { return manager.mint(alpha, 420) })
    .then(function () { return manager.mint(bravo, 110) })
}
