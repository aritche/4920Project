import React, { Component } from 'react';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';

export default class CreateSignupForm extends Component {
    constructor() {
        super();
        
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',

            submitError: false,
            errorMessage: 'An error has occurred.',

            // validation variables
            passwordMismatch: false,
            firstNameError: false,
            lastNameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false
        }
    }
    onFirstNameChange = (e) => {
        this.setState({ firstName: e.target.value });
    }

    onLastNameChange = (e) => {
        this.setState({ lastName: e.target.value });
    }
    
    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    onConfirmPasswordChange = (e) => {
        this.setState({ confirmPassword: e.target.value });
    }
    
    attemptSignup = () => {
        // Input validation here
        // Assume no errors to start with
        this.setState({ passwordMismatch: false });
        this.setState({ firstNameError: false });
        this.setState({ lastNameError : false });
        this.setState({ emailError: false });
        this.setState({ passwordError : false });
        this.setState({ confirmPasswordError : false });
        this.setState({ submitError: false });
        var validationError = false

        // Check that fields are not blank
        if (this.state.firstName == ''){
            this.setState({ firstNameError : true });
            validationError = true;
        }

        if (this.state.lastName == ''){
            this.setState({ lastNameError : true });
            validationError = true;
        }

        if (this.state.email == ''){
            this.setState({ emailError : true });
            validationError = true;
        }
        
        if (this.state.password == ''){
            this.setState({ passwordError : true });
            validationError = true;
        }


        if (this.state.confirmPassword == ''){
            this.setState({ confirmPasswordError : true });
            validationError = true;
        }


        if (validationError){
            this.setState({ errorMessage: 'No fields can be left blank.'});
            this.setState({ submitError: true });
        } else{
            // Check that passwords match
            if (this.state.password != this.state.confirmPassword){
                this.setState({ passwordMismatch: true });
                this.setState({ errorMessage: 'Passwords must match.'});
                this.setState({ submitError: true });
            } else{
                // Connect to back-end here
                this.setState({ submitted: true });
                console.log("Sending data to backend...");
                console.log("Getting response...");
                var success = false;

                if (success){
                    
                } else{
                    this.setState({ submitError: true });
                    this.setState({ errorMessage: 'We were unable to sign you up. Please try again later.'});
                }
            }
        }
    }
    
    render() {
        // code is a modified version of Semantic-UI-React login template
        //   - found at https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/LoginLayout.js
        return (
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 650 }}>
                    <Form error={this.state.submitError} success={this.state.submitted && !this.state.submitError}>
                        <Segment>
                            <h1>Join the Community!</h1>
                            <Form.Group widths='equal'>
                                <Form.Input error={this.state.firstNameError} placeholder="First Name" value={this.state.firstName} onChange={this.onFirstNameChange} />
                                <Form.Input error={this.state.lastNameError} placeholder="Last Name" value={this.state.lastName} onChange={this.onLastNameChange} />
                            </Form.Group>
                            <Form.Input error={this.state.emailError} placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
                            <Form.Input error={this.state.passwordError || this.state.passwordMismatch} placeholder="Password" type='password' value={this.state.password} onChange={this.onPasswordChange} />
                            <Form.Input error={this.state.confirmPasswordError || this.state.passwordMismatch} placeholder="Confirm Password" type='password' value={this.state.confirmPassword} onChange={this.onConfirmPasswordChange} />
                            <Button fluid color='green' type='submit' onClick={this.attemptSignup}>Sign up</Button>
                            <Message error header='Unable to Sign Up' content={this.state.errorMessage}/>
                            <Message success header='Sign Up Successful!' content='Please check your email for a confirmation.'/>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}
