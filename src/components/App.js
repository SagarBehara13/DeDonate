import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Navbar from './Navbar'
import Main from './Main'
import MetaMaskConnect from './MetamaskConnect'
import Donation from '../abis/Donation.json'

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    // await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Donation.networks[networkId]

    if(networkData){
      const donation = web3.eth.Contract(Donation.abi, networkData.address)
      this.setState({ donation })

      const requestCount = await donation.methods.requestCount().call()
      console.log(requestCount.toString());
      this.setState({ requestCount })

      for(var i = 1; i <= requestCount; i++){
        const request = await donation.methods.requests(i).call()
        console.log(request);
        this.setState({
          requests: [...this.state.requests, request]
        })
      }

      this.setState({ loading: false })
      console.log(this.state.requests);
    } else {
      window.alert("Donation contract is not deployed to detected network")
    }
  }

  constructor(props){
    super(props)
    this.state = {
      account : '',
      requestCount: 0,
      requests: [],
      loading: true
    }

    this.loadWeb3 = this.loadWeb3.bind(this)
    this.createRequest = this.createRequest.bind(this)
    this.fullFillRequest = this.fullFillRequest.bind(this)
  }

  createRequest(name, price, category, story, image) {
    this.setState({ loading: true })
    this.state.donation.methods.createRequest(name, price, category, story, image).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  fullFillRequest(id, price) {
    this.setState({ loading: true })
    this.state.donation.methods.fullFillRequest(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <p> loading.... </p>
                : <Main
                    requests={this.state.requests}
                    createRequest={this.createRequest}
                    fullFillRequest={this.fullFillRequest}
                  />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
