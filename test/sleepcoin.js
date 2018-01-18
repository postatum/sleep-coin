// var SleepCoin = artifacts.require('SleepCoin')

// contract('SleepCoin', function (accounts) {
//   it('should put 4200 SleepCoins in the first account', function () {
//     return SleepCoin.deployed().then(function (instance) {
//       return instance.getBalance.call(accounts[0])
//     }).then(function (balance) {
//       assert.equal(balance.valueOf(), 4200, "4200 wasn't in the first account")
//     })
//   })
//   it('should send coins correctly', function () {
//     var meta

//     // Get initial balances of first and second account.
//     var acc1 = accounts[0]
//     var acc2 = accounts[1]

//     var acc1Before
//     var acc2Before
//     var acc1After
//     var acc2After

//     var amount = 150

//     return SleepCoin.deployed().then(function (instance) {
//       meta = instance
//       return meta.getBalance.call(acc1)
//     }).then(function (balance) {
//       acc1Before = balance.toNumber()
//       return meta.getBalance.call(acc2)
//     }).then(function (balance) {
//       acc2Before = balance.toNumber()
//       return meta.transfer(acc2, amount, {from: acc1})
//     }).then(function () {
//       return meta.getBalance.call(acc1)
//     }).then(function (balance) {
//       acc1After = balance.toNumber()
//       return meta.getBalance.call(acc2)
//     }).then(function (balance) {
//       acc2After = balance.toNumber()

//       assert.equal(
//         acc1After, acc1Before - amount,
//         "Amount wasn't correctly taken from the sender")
//       assert.equal(
//         acc2After, acc2Before + amount,
//         "Amount wasn't correctly sent to the receiver")
//     })
//   })
// })
