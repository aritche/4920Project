import React, { Component } from 'react';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';

export default class CreateLoginForm extends Component {
    constructor() {
        super();
        
        this.state = {
            email: '',
            password: '',
            submitError: false,
            emailError: false,
            passwordError: false,
            errorMessage: 'An error has occurred.'
        }
    }
    
    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }
    
    attemptLogin = () => {
        // Form validation
        // Assume no errors
        this.setState({ emailError: false });
        this.setState({ passwordError: false });
        this.setState({ submitError : false });
        var validationError = false

        if (this.state.email == ''){
            this.setState({ emailError : true });
            validationError = true;
        }

        if (this.state.password == ''){
            this.setState({ passwordError : true });
            validationError = true;
        }

        // Check if any validation errors occurred
        if (validationError){
            this.setState({ errorMessage: 'Email and Password must not be blank.'});
            this.setState({ submitError: true });
        } else{
            // Connect to back-end here
            console.log("Sending data to backend...")
            console.log("Getting response...")
            var success = false

            // Assume no error
            if (success){
                // If successful
                alert("Successful login. " + this.state.email + " has logged in with password " + this.state.password)
            } else{
                // If unsuccessful
                this.setState({ submitError: true });
                this.setState({ errorMessage: 'Incorrect account details, please try again.'});
            }
        }
    }
    
    render() {
        // code is a modified version of Semantic-UI-React login template
        //   - found at https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/LoginLayout.js
        return (
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 500 }}>
                    <Form error={this.state.submitError}>
                        <Segment>
                            <h1>This is the search page.</h1>
                            <Form.Input error={this.state.emailError} placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
                            <Form.Input error={this.state.passwordError} placeholder="Password" type='password' value={this.state.password} onChange={this.onPasswordChange} />
                            <Button fluid color='green' type='submit' onClick={this.attemptLogin}>Log In</Button>
                            <Message error header='Unable to Log In' content={this.state.errorMessage}/>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}
