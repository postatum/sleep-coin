/*
Call with:
  node example/script.js addr_of_deployed_sleepcoinmanager_contract

SCM deployment addr is logged when running `truffle migrate`.
*/

var contractJson = require('../build/contracts/SleepCoinManager.json')
var _ = require('lodash')
var Web3 = require('web3')
var web3 = new Web3()

web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:7545'))
var SC_MANAGER_ADDR = process.argv[2]

var alice = web3.eth.accounts[0]
var bob = web3.eth.accounts[1]
var SCMContract = web3.eth.contract(contractJson.abi)
var SCManager = SCMContract.at(SC_MANAGER_ADDR)

function listSCBalances (w3, mgr) {
  var balance
  _.each(w3.eth.accounts, function (addr) {
    balance = mgr.getBalance(addr, {from: alice}).toString(10)
    console.log(addr, '-', balance, 'SC')
  })
}

console.log('\nInitial SC balances:')
listSCBalances(web3, SCManager)

console.log('\nMint 420 coins to Alice')
SCManager.mint(alice, 420, {from: alice})
listSCBalances(web3, SCManager)

console.log('\nSelf-mint 110 coins to Bob')
SCManager.mintSender(110, {from: bob})
listSCBalances(web3, SCManager)

console.log('\nTransfer 50 coins from Alice to Bob')
SCManager.transfer(bob, 50, {from: alice})
listSCBalances(web3, SCManager)
