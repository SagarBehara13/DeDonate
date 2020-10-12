import React, {Component, useState} from "react";
import {Button, Form, FormGroup, Label, Input, FormText, FormFeedback, NavItem, NavLink, Nav, TabContent, TabPane} from 'reactstrap';
import classnames from "classnames";

import Donation from '../abis/Donation.json'
import CharityContract from '../abis/CharityToken.json'

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      name: "",
      price: "",
      category: "",
      image: "",
      story: ""
    };

    this._handleInputChange = this._handleInputChange.bind(this);
  }

  toggle = (tab) => {
    if(this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
    }
  }

  _handleInputChange (event) {
    const { value, name } = event.target
    console.log(value, name);
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
     <div className="container">
       <div className="" id="request">
        <h4 className="form-head">Are you talented & Looking for donations?</h4>
        <h5 className="form-subhead">Provide us your details and let us give you the chance to meet your donors!!</h5>
         <TabContent activeTab={this.state.activeTab}>
           <TabPane tabId="1">
             <Form onSubmit={(event) => {
               event.preventDefault()
               console.log(this.state.name);
               //const price = window.web3.utils.toWei(this.requestPrice.value.toString(), 'Ether') || 0
               //console.log(name, category, story, image);
               //this.props.createRequest(name, price, category, story, image)
             }} className="main-form">
               <FormGroup>
                 <Label htmlFor="name" className="form-label">Full Name</Label>
                 <Input type="text" id="requestName" name="name"
                    onChange={this._handleInputChange} placeholder="Enter your name here"
                 />
               </FormGroup>
               <FormGroup>
                 <Label htmlFor="criteria" className="form-label">Criteria</Label>
                 <Input type="select" name="criteria" id="requestCategory"
                    innerRef={(input) => this.requestCategory = input}>
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
                 <Input type="text" rows={3} columns={50} name="story" id="requestPrice"
                    innerRef={(input) => this.requestPrice = input} placeholder="amount"
                 />
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
           <TabPane tabId="2">
             <Form className="main-form">
               <FormGroup>
                 <Label htmlFor="name" className="form-label">Full Name</Label>
                 <Input type="text" id="requestName" name="name"
                        innerRef={(input) => this.requestName = input} placeholder="Enter your name here"
                 />
               </FormGroup>
               <FormGroup>
                 <Label htmlFor="criteria" className="form-label">Criteria</Label>
                 <Input type="select" name="criteria" id="requestCategory"
                        innerRef={(input) => this.requestCategory = input}>
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
                 <Input type="text" rows={3} columns={50} name="story" id="requestPrice"
                        innerRef={(input) => this.requestPrice = input} placeholder="amount"
                 />
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
         </TabContent>
      </div>
     </div>
    );
  }
}

export default Request;
