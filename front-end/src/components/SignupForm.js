import React, { Component } from 'react';
import { Checkbox, FormGroup, InputGroup, FormControl, Radio } from 'react-bootstrap';
import { Button, ControlLabel } from "react-bootstrap";
import {Form, AlertDismissable, Glyphicon} from 'react-bootstrap';
import ReactDom from 'react-dom';
// import Popup from 'react-popup';
import "./Join.css";


/** The prompt content component */
class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
          email: "",
          confirmEmail: "",
          name: "",
          password: ""
        };
      }

      validateForm() {
        return this.state.email.length > 0 && this.state.name.length > 0;
      }

      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      handleSubmit = event => {
        event.preventDefault();
      }

      render() {
        return (
          <div className="Join">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="name" bsSize="large">
                <ControlLabel>Your Name</ControlLabel>
                <FormControl
                autoFocus
                type="name"
                value={this.state.name}
                onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Your Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="confirmEmail" bsSize="large">
                <ControlLabel>Confirm Email</ControlLabel>
                <FormControl
                  value={this.state.confirmEmail}
                  onChange={this.handleChange}
                  type="confirmEmail"
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Your Password</ControlLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <FormGroup>
                    <InputGroup>
                        {/* <InputGroup.Addon></InputGroup.Addon> */}
                        <Radio name="genderGroup" inline>Male</Radio>
                        <Radio name="genderGroup" inline>Female</Radio>
                        <Radio name="genderGroup" inline>Non-binary</Radio>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        {/* <InputGroup.Addon></InputGroup.Addon> */}
                        <Checkbox inline>I agree to the ULive Customer Agreement</Checkbox>
                    </InputGroup>
                </FormGroup>
              <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
              >
                Join
              </Button>
            </form>
          </div>
        );
      }
    }

export default SignupForm;