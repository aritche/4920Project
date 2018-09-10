import React, { Component } from 'react';
import { Button, Form, Grid, Message } from 'semantic-ui-react';

export default class CreateSignupForm extends Component {
    constructor() {
        super();
        
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            submitError: false,
            submitted: false
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
    
    attemptSignup = () => {
        // Input validation here

        // Connect to back-end here
        this.setState({ submitted: true });
        console.log("Sending data to backend...");
        console.log("Getting response...");

        var success = false;

        if (success){
            this.setState({ submitError : false});
        } else{
            this.setState({ submitError : true});
        }
    }
    
    render() {
        return (
            <Grid centered columns={2}>
                <Grid.Row centered columns={2}>
                <h1>Join the Community!</h1>
                <Form error={this.state.submitted && this.state.submitError} success={this.state.submitted && !this.state.submitError}>
                    <Form.Group widths='equal'>
                        <Form.Input placeholder="First Name" value={this.state.firstName} onChange={this.onFirstNameChange} />
                        <Form.Input placeholder="Last Name" value={this.state.lastName} onChange={this.onLastNameChange} />
                    </Form.Group>
                    <Form.Input placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
                    <Form.Input placeholder="Password" type='password' value={this.state.password} onChange={this.onPasswordChange} />
                    <Button color='green' type='submit' onClick={this.attemptSignup}>Sign up</Button>
                    <Message error header='Unable to Sign Up' content='Something went wrong, please try again.'/>
                    <Message success header='Sign Up Successful!' content='Please check your email for a confirmation.'/>
                </Form>
                </Grid.Row>
            </Grid>
        )
    }
}
