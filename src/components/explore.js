import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardImg, CardSubtitle, CardText, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import classnames from 'classnames';
import Donation from '../abis/Donation.json'
import CharityContract from '../abis/CharityToken.json'
import {Modal} from "react-bootstrap";
import Web3 from 'web3';

let amount = {};

const Explore = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [show, setShow] = useState(false);
  const [charityId, setCharityId] = useState('');
  const [accounts, setAccounts] = useState();
  const [donations, setDonations] = useState();
  const [charity, setCharity] = useState();
  const [reqCount, setReqCount] = useState()
  const [charityCount, setCharityCount] = useState();
  const [requests, setRequests] = useState([])
  const [charityRequests, setCharityRequests] = useState([])

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const handleClose = () => setShow(false);

  useEffect(() => {
    anonymousFunc()
  }, [])

  const anonymousFunc = async () => {
    await loadWeb3()
    await loadBlockchainData()
  }

  async function loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccounts(accounts[0])

    const networkId = await web3.eth.net.getId()
    const networkData = Donation.networks[networkId]
    const charityNetworkData = CharityContract.networks[networkId]

    if (networkData) {
      const donation = web3.eth.Contract(Donation.abi, networkData.address)
      const charity = web3.eth.Contract(CharityContract.abi, charityNetworkData.address)
      setDonations(donation)
      setCharity(charity)

      const requestCount = await donation.methods.requestCount().call()
      const charityRequestCount = await charity.methods.charityRequestCount().call()
   
      setReqCount(requestCount)
      setCharityCount(charityRequestCount)

      for (var i = 1; i <= requestCount; i++) {
        const request = await donation.methods.requests(i).call()
        setRequests([...requests, request])
      }

      for (var j = 1; j <= charityRequestCount; j++) {
        const onGoingCharities = await charity.methods.onGoingCharity(j).call()
        
        setCharityRequests([...charityRequests, onGoingCharities])
      }
    } else {
      window.alert("Donation contract is not deployed to detected network")
    }
  }

  async function loadWeb3() {
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
  }

  

  function donateToCharity(id, value) {
    charity.methods.donateToCharity(id, value).send({ from: accounts, value: value })
      .once('receipt', (receipt) => {
        console.log('Loading, the receipt is ', receipt)
      })
  }

  return (
    <div className="container bg explore-main">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(event) => {
            event.preventDefault()
            const ids = charityId
            const value = amount.value
            console.log(ids, value)
            donateToCharity(ids, value)
          }} className="main-form">
            <FormGroup>
              <Label htmlFor="name" className="form-label">Charity Id</Label>
              <Input type="text" id="ids" name="name" placeholder="Charity ID" disabled={'disabled'} value={charityId}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name" className="form-label">Amount</Label>
              <Input type="decimal" id="requestValue" name="name"
                     innerRef={(input) => {amount = input}}
                     placeholder="Donation Amount"
              />
            </FormGroup>
            <Button className="form-btn" type="submit" value="submit" color="primary">Donate</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="row">
      <div className="col-12">
      <Nav tabs>
        <NavItem>
          <NavLink type="button"
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Peer To Peer
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink type="button"
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              Charity
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="row tabs-main-container">
            {
              props.requests.map((request, key) => {
                let donator

                if(request.owner === request.donator){
                  donator = "No Donator"
                } else {
                  donator = request.donator
                }
                return(
                  <Col sm="12" md="6">
                    <div className="custom-card">
                      <div className="header-card">
                        <img width="130px" height="130px" src={ request.image } alt="Card cap" className="card-image"/>
                        <div className="header-card-content">
                          <p className="name">Name: { request.name }</p>
                          <p className="price">Amount: { window.web3.utils.fromWei(request.price.toString(), 'Ether') } RBTC</p>
                            {
                              !request.donated
                              ? <Button
                                  color="info"
                                  className="donate-btn"
                                  id={request.id}
                                  value={request.price}
                                  onClick={(event) => {
                                    //console.log(event.target)
                                    props.fullFillRequest(event.target.id, event.target.value)
                                  }}
                                >
                              Donate Now</Button>
                              : null
                            }
                        </div>
                      </div>
                        <div className="body-card">
                          <CardText>Story: { request.story }</CardText>
                        </div>
                    </div>
                    </Col>
                )
              })
            }
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="row tabs-main-container">
              {
                props.charityRequests.map((request, key) => {
                  let status

                  if(request.live === false){
                    status = "Closed"
                  } else {
                    status = "Live"
                  }

                  return(
                    <Col sm="12" md="6">
                      <div className="custom-card">
                        <div className="header-card">
                          <img width="130px" height="130px" src={ request.image } alt="Card cap" className="card-image"/>
                          <div className="header-card-content">
                            <p className="name">Id: { request.id.toString() }</p>
                            <p className="name">Name: { request.name }</p>
                            <p className="name">Amount: { request.raiseGoal.toString() } $</p>
                            <p className="name">Amount Raised: { request.ammountRaised.toString() }</p>
                            <p className="name">Status: { status }</p>
                            <Button
                                color="info"
                                className="donate-btn"
                                id={request.id}
                                value={request.price}
                                onClick={() => {
                                  setCharityId(request.id)
                                  setShow(true);
                                }}
                            >
                              Donate Now</Button>
                          </div>
                        </div>
                          <div className="body-card">
                            <CardText>Story: { request.cause }</CardText>
                          </div>
                      </div>
                      </Col>
                  )
                })
              }
            </div>
          </TabPane>
        </TabContent>
        </div>
      </div>
    </div>
  );
}

export default Explore;
