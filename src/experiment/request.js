import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';

class Request extends Component {
  render() {
    return (
     <div className="container">
       <div className="" id="request">
        <h4 className="form-head">Are you talented & Looking for donations?</h4>
        <h5 className="form-subhead">Provide us your details and let us give you the chance to meet your donors!!</h5>
        <Form onSubmit={this.handleLogin} className="main-form">
            <FormGroup>
                <Label htmlFor="name" className="form-label">Full Name</Label>
                <Input type="text" id="name" name="name"
                    innerRef={(input) => this.name = input} placeholder="Enter your name here"
                />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="criteria" className="form-label">Criteria</Label>
              <Input type="select" name="criteria" id="criteria"
                    innerRef={(input) => this.criteria = input}>
                <option>Education</option>
                <option>Sports</option>
                <option>Others</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="story" className="form-label">Tell us about yourself</Label>
              <Input type="textarea" rows={10} columns={50} name="story" id="story"
                    innerRef={(input) => this.story = input} placeholder="Describe in short why you need this" maxLength={200}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="exampleFile" className="form-label">Passport sized photo</Label>
              <Input type="file" name="photo" id="photo" />
              <FormText color="muted">
                Upload your recent passport sized photo(jpg/png)
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
