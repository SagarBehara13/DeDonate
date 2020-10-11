import React, { Component } from 'react';
import Web3 from 'web3';
import Home from './home';
import Request from './request';
import CharityRequest from './charityRequest';
import NavBar from './navbar';
import Donation from '../abis/Donation.json'
import CharityContract from '../abis/CharityToken.json'
// import { connect } from 'react-redux';
import Explore from './explore';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {

  async componentWillMount(){
    await this.loadWeb3()
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

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
            <Route path="/home" component={Home} />
            <Route
              path="/explore"
              component={Explore}
            />
            <Route
              path="/request"
              component={Request}
            />
            <Route
              path="/charityRequest"
              component={CharityRequest}
            />
            <Redirect to="/home" />
        </Switch>
      </div>
    )
  }
}

export default withRouter(Main);
