var SleepCoinManager = artifacts.require('SleepCoinManager')
var SleepCoin = artifacts.require('SleepCoin')

function deployManager () {
  var coin, manager
  return SleepCoin.new()
    .then(function (instance) {
      coin = instance
      return SleepCoinManager.new()
    })
    .then(function (instance) {
      manager = instance
      return coin.transferOwnership(manager.address)
    })
    .then(function () { return manager.watchCoin(coin.address) })
    .then(function () { return manager })
}

contract('SleepCoinManager mint', function (accounts) {
  it('should mint coins correctly', function () {
    var manager
    var acc1 = accounts[0]
    var acc1Before
    var acc1After
    var amount = 120

    return deployManager().then(function (instance) {
      manager = instance
      return manager.getBalance.call(acc1)
    }).then(function (balance) {
      acc1Before = balance.toNumber()
      return manager.mint(acc1, amount)
    }).then(function () {
      return manager.getBalance.call(acc1)
    }).then(function (balance) {
      acc1After = balance.toNumber()
      assert.equal(
        acc1After, acc1Before + amount,
        "Amount wasn't correctly minted")
    })
  })
})

contract('SleepCoinManager mintSender', function (accounts) {
  it('should mint coins correctly to sender', function () {
    var manager
    var acc1 = accounts[0]
    var acc1Before
    var acc1After
    var amount = 120

    return deployManager().then(function (instance) {
      manager = instance
      return manager.getBalance.call(acc1)
    }).then(function (balance) {
      acc1Before = balance.toNumber()
      return manager.mintSender(amount, {from: acc1})
    }).then(function () {
      return manager.getBalance.call(acc1)
    }).then(function (balance) {
      acc1After = balance.toNumber()
      assert.equal(
        acc1After, acc1Before + amount,
        "Amount wasn't correctly minted")
    })
  })
})

contract('SleepCoinManager transfer', function (accounts) {
  it('should transfer coins correctly', function () {
    var manager

    // Get initial balances of first and second account.
    var acc1 = accounts[0]
    var acc2 = accounts[1]

    var acc1Before
    var acc2Before
    var acc1After
    var acc2After

    var amount = 150

    return deployManager().then(function (instance) {
      manager = instance
      return manager.mint(acc1, 250)
    }).then(function () {
      return manager.getBalance.call(acc1)
    }).then(function (balance) {
      acc1Before = balance.toNumber()
      return manager.getBalance.call(acc2)
    }).then(function (balance) {
      acc2Before = balance.toNumber()
      return manager.transfer(acc2, amount, {from: acc1})
    }).then(function () {
      return manager.getBalance.call(acc1)
    }).then(function (balance) {
      acc1After = balance.toNumber()
      return manager.getBalance.call(acc2)
    }).then(function (balance) {
      acc2After = balance.toNumber()

      assert.equal(
        acc1After, acc1Before - amount,
        "Amount wasn't correctly taken from the sender")
      assert.equal(
        acc2After, acc2Before + amount,
        "Amount wasn't correctly sent to the receiver")
    })
  })
})

contract('SleepCoinManager watchCoin', function (accounts) {
  it('should start watching coin', function () {
    var manager
    return SleepCoinManager.new().then(function (instance) {
      manager = instance
      return manager.watchCoin(accounts[1])
    }).then(function () {
      return manager.coinAddr()
    }).then(function (addr) {
      assert.equal(addr, accounts[1])
    })
  })
})

contract('SleepCoinManager watchCoin onlyTeam', function (accounts) {
  it('should not allow non-team-members to change coin addr', function () {
    var manager
    var coinAddr
    return deployManager().then(function (instance) {
      manager = instance
      return manager.coinAddr()
    }).then(function (addr) {
      coinAddr = addr
      return manager.watchCoin(accounts[1])
    }).then(function () {
      return manager.coinAddr()
    }).then(function (addr) {
      assert.equal(addr, accounts[1])
      return manager.watchCoin(coinAddr, {from: accounts[2]}).catch(function () {})
    }).then(function () {
      return manager.coinAddr()
    }).then(function (addr) {
      assert.equal(addr, accounts[1])
    }).then(function () {
      return manager.addMember(accounts[2])
    }).then(function () {
      return manager.watchCoin(coinAddr, {from: accounts[2]})
    }).then(function () {
      return manager.coinAddr()
    }).then(function (addr) {
      assert.equal(addr, coinAddr)
    })
  })
})
