// var SleepCoin = artifacts.require('SleepCoin')

// contract('SleepCoin', function (accounts) {
//   it('should mint coins correctly', function() {
//     var coin
//     var acc1 = accounts[0]
//     var acc1Before
//     var acc1After
//     var amount = 120

//     return SleepCoin.new().then(function (instance) {
//       coin = instance
//       return coin.getBalance.call(acc1)
//     }).then(function (balance) {
//       acc1Before = balance.toNumber()
//       return coin.mint(acc1, amount)
//     }).then(function() {
//       return coin.getBalance.call(acc1)
//     }).then(function (balance) {
//       acc1After = balance.toNumber()
//       assert.equal(
//         acc1After, acc1Before + amount,
//         "Amount wasn't correctly minted")
//     })
//   })
//   it('should send coins correctly', function () {
//     var coin

//     // Get initial balances of first and second account.
//     var acc1 = accounts[0]
//     var acc2 = accounts[1]

//     var acc1Before
//     var acc2Before
//     var acc1After
//     var acc2After

//     var amount = 150

//     return SleepCoin.new().then(function (instance) {
//       coin = instance
//       return coin.mint(acc1, 250)
//     }).then(function() {
//       return coin.getBalance.call(acc1)
//     }).then(function (balance) {
//       acc1Before = balance.toNumber()
//       return coin.getBalance.call(acc2)
//     }).then(function (balance) {
//       acc2Before = balance.toNumber()
//       return coin.transfer(acc1, acc2, amount, {from: acc1})
//     }).then(function () {
//       return coin.getBalance.call(acc1)
//     }).then(function (balance) {
//       acc1After = balance.toNumber()
//       return coin.getBalance.call(acc2)
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
