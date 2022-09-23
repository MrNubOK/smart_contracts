import { Component } from "react"
import ConnectWallet from "../components/ConnectWallet"
import { ethers } from 'ethers'
import contractAddress from '../../contracts/DutchAuction-contract-address.json' 
import auctionArtifact from '../../contracts/DutchAuction-contract.json' 
import { WaitingForTransactionMessage } from "../components/WaitingForTransactionMessage"
import { TransactionErrorMessage } from "../components/TransactionErrorMessage"

const HARDHAT_NETWORK_ID = '31337';
const ERROR_CODE_TX_REJECTED_BY_USER = 4001

export default class extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      networkError: null,
      transactionError: null,
      selectedAddress: null,
      currentPrice: null,
      txBeingSent: null,
      balance: null,
      stopped: false,
    }

    this.state = this.initialState
  }

  connectWallet = async () => {
    if (!window.ethereum) {
      this.setState({
        networkError: "Pls, install MetaMask"
      })
      return;
    }

    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts"
    })

    if(!this.checkNetwork()) { return }

    this.initialize(selectedAddress) 

    window.ethereum.on('accountChanged', ([newAddress]) => {
      if (newAddress === undefined) {
        return this.resetState()
      }

      this.initialState(newAddress)
    })

    window.ethereum.on('chainChanged', () => {
      this.resetState()
    })
  }

  checkNetwork = () => {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) { return true }

    this.setState({
      networkError: "Pls, connect to localhost:8545"
    })

    return false
  }

  initialize = async (selectedAddress) => {
    this._provider = new ethers.providers.Web3Provider(window.ethereum)

    this._auction = new ethers.Contract(
      contractAddress.DutchAuction,
      auctionArtifact.abi,
      this._provider.getSigner(0)
    )

    this.setState(
      {selectedAddress: selectedAddress},
      async () => {
        await this.updateBalance()
      }
    )

    if (await this.updateStopped()) { return }

    this.startingPrice = await this._auction.startingPrice()
    this.startAt = await this._auction.startAt()
    this.discountRate = await this._auction.discountRate()

    this.checkPriceInterval = setInterval(() => {
      const elapsed = ethers.BigNumber.from(
        Math.floor(Date.now() / 1000)
      ).sub(this.startAt)

      const discount = elapsed.mul(this.discountRate)
      const price = this.startingPrice.sub(discount)

      this.setState({
        currentPrice: ethers.utils.formatEther(price)
      })
    }, 1000)
  }

  updateStopped = async () => {
    const stopped = await this._auction.stopped()

    if(stopped) {
      clearInterval(this.checkPriceInterval)
    }

    this.setState({
      stopped: stopped
    })

    return stopped;
  }

  updateBalance = async () => {
    const balance = (await this._provider.getBalance(
      this.state.selectedAddress
    )).toString()

    this.setState({
      balance: balance
    })
  }

  buy = async () => {
    try {
      const price = await this._auction.getPrice()

      const tx = await this._auction.buy({
        value: ethers.utils.parseEther(this.state.currentPrice)
      })
  
      this.setState({
        txBeingSent: tx.hash
      })
      
      await tx.wait()
    } catch(error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) { return }

      console.error(error)

      this.setState({
        transactionError: error
      })

    } finally {
      this.setState({
        txBeingSent: null,
      })
      await this.updateStopped()
      await this.updateBalance()
    }
  }

  resetState() {
    this.state = this.initialState
  }

  componentWillUnmount() {
    clearInterval(this.checkPriceInterval)
  }

  _getRpcErrorMessage = (error) => {
    if (error.data) {
      return error.data
    }

    return error.message
  }

  _dismissTransactionError = () => {
    this.setState({
      transactionError: null
    })
  }

  _dismissNetworkError = () => {
    this.setState({
      networkError: null
    })
  }

  render() {
    if (this.state.stopped) {
      return <h1>Auction was been stopped</h1>
    }

    if (!this.state.selectedAddress) {
      return <ConnectWallet
        connect={this.connectWallet}
        networkError={this.state.networkError}
        dismiss={this._dismissNetworkError}
      />
    }

    return (
      <>
        {
          this.state.txBeingSent &&
            <WaitingForTransactionMessage txHash={this.state.txBeingSent} />
        }

        {
          this.state.transactionError &&
          <TransactionErrorMessage
            message={this._getRpcErrorMessage(this.state.transactionError)}
            dismiss={this._dismissTransactionError}
          />
        }

        {
          this.state.balance && 
            <div>Balance: {ethers.utils.formatEther(this.state.balance)} ETH</div>
        }

        {
          this.state.currentPrice && 
            (
              <>
                <div>Price: {this.state.currentPrice} ETH</div>
                <button onClick={this.buy}>Buy</button>
              </>
            )
        }
      </>
    )
  }
}
