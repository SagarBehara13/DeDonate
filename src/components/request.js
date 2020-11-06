import React, { Component } from "react";
import Web3 from 'web3';
import classnames from 'classnames';
import { TabContent, Button, Form, FormGroup, Label, Input, FormText, FormFeedback, Nav, NavItem, NavLink, TabPane } from 'reactstrap';
import Donation from '../abis/Donation.json'
import CharityContract from '../abis/CharityToken.json'

class CharityRequest extends Component {

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
        console.log("req",request);
        this.setState({
          requests: [...this.state.requests, request]
        })
      }

      for(var j = 1; j <= charityRequestCount; j++){
        const onGoingCharities = await charity.methods.onGoingCharity(j).call()
        console.log("onG",onGoingCharities, j);
        this.setState({
          charityRequests: [...this.state.charityRequests, onGoingCharities]
        })
      }

      this.setState({ loading: false })
      console.log('peer requests', this.state.requests);
      console.log('charityRequests', this.state.charityRequests);
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
      loading: true,
      activeTab: "1"
    }

    this.loadWeb3 = this.loadWeb3.bind(this)
    this.createRequest = this.createRequest.bind(this)
    this.fullFillRequest = this.fullFillRequest.bind(this)
    this.raiseFund = this.raiseFund.bind(this)
    this.donateToCharity = this.donateToCharity.bind(this)
    this.approve = this.approve.bind(this)
    this.claimTokens = this.claimTokens.bind(this)
    this.balanceOf = this.balanceOf.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  toggle(tab){
    if(this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
    }
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

  raiseFund(name, symbol, raiseGoal, image, cause) {
    this.setState({ loading: true })
    this.state.charity.methods.createToken(name, symbol, raiseGoal, image, cause).send({ from: this.state.account })
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
     <div className="container">
       <div className="back">
       <div className="" id="request">
        <h4 className="form-head">Are you talented & Looking for donations?</h4>
        <h5 className="form-subhead">Provide us your details and let us give you the chance to meet your donors!!</h5>
        <Nav tabs>
           <NavItem>
             <NavLink type="button "
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
             >
               Peer To Peer
             </NavLink>
           </NavItem>
           <NavItem>
             <NavLink type="button"
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
             >
               Charity
             </NavLink>
           </NavItem>
           <NavItem>
             <NavLink type="button"
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
             >
               Approve Token
             </NavLink>
           </NavItem>
           <NavItem>
             <NavLink type="button"
                className={classnames({ active: this.state.activeTab === '4' })}
                onClick={() => { this.toggle('4'); }}
             >
               Donate To Charity
             </NavLink>
           </NavItem>
         </Nav>
         <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Form onSubmit={(event) => {
              console.log(this);
              event.preventDefault()
              const name = this.requestDName.value
              // const price = window.web3.utils.toWei(this.requestPrice.value.toString(), 'Ether') || 0
              const price = this.requestPrice.value.toString();
              const category = this.requestCategory.value
              const story = this.requestStory.value
              const image = this.requestPTPImage.value
              console.log('name',name,'price', price,'category', category,'story', story,'image', image);
              // this.createRequest(name, price, category, story, image)
            }} className="main-form">
              <FormGroup>
                <Label htmlFor="name" className="form-label">Full Name</Label>
                <Input type="text" id="requestDName" name="requestDName"
                  innerRef={(input) => {
                    console.log(input);
                    this.requestDName = input;
                  }} placeholder="Enter your name here"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="criteria" className="form-label">Criteria</Label>
                <Input type="select" name="criteria" id="requestCategory"
                       innerRef={(input) => {
                         console.log(input);
                         this.requestCategory = input;
                       }}>
                  <option>Education</option>
                  <option>Sports</option>
                  <option>Others</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="story" className="form-label">Tell us about yourself</Label>
                <Input type="textarea" rows={3} columns={50} name="story" id="requestStory"
                       innerRef={(input) => this.requestStory = input} placeholder="Describe in short why you need this" maxLength={200}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="story" className="form-label">Donation Amount</Label>
                <Input type="number" rows={3} columns={50} name="story" id="requestPrice"
                       innerRef={(input) => this.requestPrice = input} placeholder="amount"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="exampleFile" className="form-label">Image Url</Label>
                <Input type="text" name="photo" id="requestPTPImage" innerRef={(input) => this.requestPTPImage = input} placeholder="image"/>
                <FormText color="muted">
                  Upload your image posted on any social media
                </FormText>
              </FormGroup>
              <Button className="form-btn" type="submit" value="submit" color="primary">Submit</Button>
            </Form>
          </TabPane>
          <TabPane tabId="2">
            <Form onSubmit={(event) => {
              event.preventDefault()
              const name = this.requestName.value
              const symbol = this.requestSymbol.value
              const raiseGoal = this.raiseGoal.value
              const cause = this.requestCause.value
              const image = this.requestImage.value
              console.log(name, symbol, raiseGoal, image, cause);
              this.raiseFund(name, symbol, raiseGoal, image, cause)
            }} className="main-form">
              <FormGroup>
                <Label htmlFor="name" className="form-label">Charity Name</Label>
                <Input type="text" id="requestName" name="name"
                    innerRef={(input) => this.requestName = input} placeholder="Enter charity name here"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name" className="form-label">Symbol</Label>
                <Input type="text" id="requestSymbol" name="name"
                    innerRef={(input) => this.requestSymbol = input} placeholder="Enter desired token symbol"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name" className="form-label">Raise Goal</Label>
                <Input type="text" id="raiseGoal" name="name"
                    innerRef={(input) => this.raiseGoal = input} placeholder="Enter desired token symbol"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="exampleFile" className="form-label">Cause</Label>
                <Input type="text" name="photo" id="requestCause" innerRef={(input) => this.requestCause = input}/>
                <FormText color="muted">
                  Reason for fund raising
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="exampleFile" className="form-label">Image Url</Label>
                <Input type="text" name="photo" id="requestImage" innerRef={(input) => this.requestImage = input} placeholder="image"/>
                <FormText color="muted">
                  Upload your image posted on any social media
                </FormText>
              </FormGroup>
              <Button className="form-btn" type="submit" value="submit" color="primary">Submit</Button>
            </Form>
          </TabPane>
          <TabPane tabId="3">
            <Form onSubmit={(event) => {
              event.preventDefault()
              const address = this.deployerAddress.value
              const value = this.requestValue.value
              this.approve(address, value)
            }} className="main-form">
              <FormGroup>
                <Label htmlFor="name" className="form-label">Spender</Label>
                <Input type="text" id="deployerAddress" name="name"
                    innerRef={(input) => this.deployerAddress = input} placeholder="Spender"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name" className="form-label">Amount</Label>
                <Input type="text" id="requestValue" name="name"
                    innerRef={(input) => this.requestValue = input} placeholder="Total Tokens Amount"
                />
              </FormGroup>
              <br></br>
              <Button className="form-btn" type="submit" value="submit" color="primary">Submit</Button>
            </Form>
          </TabPane>
          <TabPane tabId="4">
            <Form onSubmit={(event) => {
              event.preventDefault()
              const id = this.id.value
              const value = this.requestValue.value
              this.donateToCharity(id, value)
            }} className="main-form">
              <FormGroup>
                <Label htmlFor="name" className="form-label">Charity Id</Label>
                <Input type="text" id="id" name="name"
                    innerRef={(input) => this.id = input} placeholder="Charity ID"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name" className="form-label">Amount</Label>
                <Input type="text" id="requestValue" name="name"
                    innerRef={(input) => this.requestValue = input} placeholder="Donation Amount"
                />
              </FormGroup>
              <br></br>
              <Button className="form-btn" type="submit" value="submit" color="primary">Submit</Button>
            </Form>
          </TabPane>
        </TabContent>
      </div>
      </div>
     </div>
    );
  }
}

export default CharityRequest;
