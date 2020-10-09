import React, { Component } from 'react';
import './App.css';

class MetaMaskConnect extends Component {
  render() {
    return (
      <div>
        <button type="submit" className="metamask" onClick={this.props.connect}>MetaMask</button>
      </div>
    )
  }
}

export default MetaMaskConnect;
