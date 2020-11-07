import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardImg, CardSubtitle, CardText, Row, Col, CardBody } from 'reactstrap';
import classnames from 'classnames';
// import logo from '../images/logo.jpeg';


const Approve = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  //
  // console.log("ppp",props.requests);
  return (
    <div className="container bg explore-main">
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
              <Col sm="12" md="6">
                <div className="custom-card">
                  <div className="header-card">
                    <img width="130px" height="130px"  alt="Card cap" className="card-image"/>
                    <div className="header-card-content">
                      <p className="name">Special Title Treatment Approve</p>
                      <p className="price">Card subtitle</p>
                      <Button color="info" className="donate-btn">
                        {/*<i className="fa fa-usd fa-lg"></i> */}
                        Donate Now</Button>
                    </div>
                  </div>
                    <div className="body-card">
                      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    </div>
                </div>
              </Col>
            </div>
          </TabPane>
        </TabContent>
        </div>
      </div>
    </div>
  );
}

export default Approve;
