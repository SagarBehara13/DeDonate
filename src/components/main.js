import React, { Component } from 'react';
import Web3 from 'web3';
import Home from './home';
import Request from './request';
import Approve from './approve';
import NavBar from './navbar';
import Donation from '../abis/Donation.json'
import CharityContract from '../abis/CharityToken.json'
// import { connect } from 'react-redux';
import Explore from './explore';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {

  async componentWillMount(){
    // await this.loadWeb3()
    // await this.loadBlockchainData()
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
    const charityNetworkData = CharityContract.networks[networkId]

    if(networkData){
      const donation = web3.eth.Contract(Donation.abi, networkData.address)
      const charity = web3.eth.Contract(CharityContract.abi, charityNetworkData.address)
      this.setState({ donation })
      this.setState({ charity })

      const requestCount = await donation.methods.requestCount().call()
      const charityRequestCount = await charity.methods.charityRequestCount().call()
      console.log("requestCount", requestCount.toString());
      console.log("charityRequestCount", charityRequestCount.toString());
      this.setState({ requestCount })
      this.setState({ charityRequestCount })

      for(var i = 1; i <= requestCount; i++){
        const request = await donation.methods.requests(i).call()
        //console.log("req",request);
        this.setState({
          requests: [...this.state.requests, request]
        })
      }

      for(var j = 1; j <= charityRequestCount; j++){
        const onGoingCharities = await charity.methods.onGoingCharity(j).call()
        //console.log("onG",onGoingCharities, j);
        this.setState({
          charityRequests: [...this.state.charityRequests, onGoingCharities]
        })
      }

      this.setState({ loading: false })
      // console.log('peer requests', this.state.requests);
      // console.log('charityRequests', this.state.charityRequests);
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
      charityRequests: [],
      loading: true
    }

    this.loadWeb3 = this.loadWeb3.bind(this)
    this.createRequest = this.createRequest.bind(this)
    this.fullFillRequest = this.fullFillRequest.bind(this)
    this.raiseFund = this.raiseFund.bind(this)
    this.donateToCharity = this.donateToCharity.bind(this)
    this.approve = this.approve.bind(this)
    this.claimTokens = this.claimTokens.bind(this)
    this.balanceOf = this.balanceOf.bind(this)
  }

  createRequest(name, price, category, story, image) {
    this.setState({ loading: true })
    this.state.donation.methods.createRequest(name, price, category, story, image).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  fullFillRequest(id, price) {
    console.log(id, price);
    this.setState({ loading: true })
    this.state.donation.methods.fullFillRequest(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  raiseFund(name, symbol, raiseGoal, image, cause) {
    this.setState({ loading: true })
    this.state.charity.methods.createToken(raiseGoal, image, cause).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  approve(address, amount){
    this.setState({ loading: true })
    this.state.charity.methods.approve(address, amount).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    //this.setState({ loading: false })
  }

  balanceOf(address){
    this.state.charity.methods.balanceOf(address).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  donateToCharity(id, value){
    this.setState({ loading: true })
    this.state.charity.methods.donateToCharity(id, value).send({ from: this.state.account, value: value })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  claimTokens(){
    this.setState({ loading: true })
    this.state.charity.methods.claimTokens().send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
            <Route path="/home" component={Home} />
            <Route
              path="/explore"
              render={ props => (
                <Explore requests={this.state.requests}
                fullFillRequest={this.fullFillRequest}
                charityRequests={this.state.charityRequests}
                />)}
            />
            <Route
              path="/request"
              component={Request}
            />
            <Route
              path="/approve"
              component={Approve}
            />
            <Redirect to="/home" />
        </Switch>
      </div>
    )
  }
}

export default withRouter(Main);
