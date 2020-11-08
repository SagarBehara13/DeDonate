import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardImg, CardSubtitle, CardText, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import classnames from 'classnames';
import {Modal} from "react-bootstrap";
// import logo from '../images/logo.jpeg';

let amount = {};
const Explore = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [show, setShow] = useState(false);
  const [charityId, setCharityId] = useState('');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }
  function handleChange(event){
    console.log(event);
  }

  return (
    <div className="container bg explore-main">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(event) => {
            event.preventDefault()
            const ids = charityId
            const value = amount.value
            console.log(ids, value)
            // this.donateToCharity(ids, value)
          }} className="main-form">
            <FormGroup>
              <Label htmlFor="name" className="form-label">Charity Id</Label>
              <Input type="text" id="ids" name="name" placeholder="Charity ID" disabled={'disabled'} value={charityId}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name" className="form-label">Amount</Label>
              <Input type="number" id="requestValue" name="name"
                     innerRef={(input) => {amount = input}}
                     placeholder="Donation Amount"
              />
            </FormGroup>
            <Button className="form-btn" type="submit" value="submit" color="primary">Donate</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Button variant="primary" onClick={() => {
        setCharityId('122knkqwd');
        setShow(true);
      }}>
        Launch demo modal
      </Button>
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
                  console.log("c seller", true);
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
                          <p className="price">Amount: { window.web3.utils.fromWei(request.price.toString(), 'Ether') } Eth</p>
                            {
                              !request.donated
                              ? <Button
                                  color="info"
                                  className="donate-btn"
                                  id={request.id}
                                  value={request.price}
                                  onClick={(event) => {
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
                    console.log("c seller", true);
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
