import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';

class Request extends Component {
  render() {
    return (
     <div className="container">
       <div className="" id="request">
        <h4 className="form-head">Are you talented & Looking for donations?</h4>
        <h5 className="form-subhead">Provide us your details and let us give you the chance to meet your donors!!</h5>
        <Form onSubmit={(event) => {
          event.preventDefault()
          const name = this.requestName.value
          const price = window.web3.utils.toWei(this.requestPrice.value.toString(), 'Ether') || 0
          const category = this.requestCategory.value
          const story = this.requestStory.value
          const image = this.requestImage.value
          console.log(name, price, category, story, image);
          this.props.createRequest(name, price, category, story, image)
        }} className="main-form">
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
      </div>
     </div>
    );
  }
}

export default Request;
