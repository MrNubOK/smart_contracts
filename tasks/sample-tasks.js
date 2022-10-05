const { task } = require('hardhat/config')
const TasksArtifact = require('../front/contracts/Tasks.json')
const TasksAddresses = require('../front/contracts/Tasks-contracts-address.json')

require('hardhat/config')

task("balance", "Displays balance")
    .addParam('account', 'Account address')
    .addOptionalParam('greeting', 'Text to greet', 'Hello World')
    .setAction(async (taskArgs, { ethers }) => {
        console.log(taskArgs.greeting)
        let balance = await ethers.provider.getBalance(taskArgs.account)
        balance = await ethers.utils.formatEther(balance.toString())
        console.log(balance.toString())
    })

task("callme", "Callme demo func")
    .addParam('contract', 'Contract address')
    .addOptionalParam('account', 'Account name', 'deployer')
    .setAction(async (taskArgs, {ethers, getUnnamedAccounts}) => {
        const account = (await getUnnamedAccounts())[0]

        const contract = new ethers.Contract(
            TasksAddresses.Tasks, 
            TasksArtifact.abi,
            await ethers.getSigner(account)
        )

        result = await contract.callme()
        console.log(result)
    })

task("pay", "Pay demo func")
    .addParam('contract', 'Contract address')
    .addOptionalParam('message', 'Comment to transaction', 'Just a comment')
    .setAction(async (taskArgs, {ethers, getUnnamedAccounts}) => {
        const account = (await getUnnamedAccounts())[0]

        const contract = new ethers.Contract(
            TasksAddresses.Tasks, 
            TasksArtifact.abi,
            await ethers.getSigner(account)
        )

        result = await contract.pay(taskArgs.message, {value: 10000})
        console.log(await contract.message())
    })

task("distribute", "Distribute")
    .addParam('contract', 'Contract address')
    .addOptionalParam('addresses', 'List of addresses for distribution')
    .setAction(async (taskArgs, {ethers, getUnnamedAccounts}) => {
        const account = (await getUnnamedAccounts())[0]

        const contract = new ethers.Contract(
            TasksAddresses.Tasks, 
            TasksArtifact.abi,
            await ethers.getSigner(account)
        )

        const addresses = taskArgs.addresses.split(',')
        console.log(addresses)

        result = await contract.distribute(addresses)
        
        await Promise.all(addresses.map(async address => {
            console.log((await ethers.provider.getBalance(address)).toString())
        }))
    })