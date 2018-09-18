import React, { Component } from 'react';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import { verify } from 'password-hash';
import { url } from '../../Api';
import { updateAuthentication } from '../../Authentication';

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
            // Connect to back-end
            fetch(url + 'authenticate', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': this.state.email
                })
            }).then(response => {
                if (response.status === 400) {
                    response.json().then(obj => {
                        this.setState({
                            submitError: true,
                            errorMessage: obj.error
                        });
                    });
                } else if (response.status === 200) {
                    response.json().then(obj => {
                        if (obj.success) {
                            if (verify(this.state.password, obj.hashed_password)) {
                                updateAuthentication(true);
                                this.props.history.push('/');
                            } else {
                                this.setState({
                                    submitError: true,
                                    errorMessage: 'Your email and password do not match. Please try again.',
                                    isLoading: false
                                });
                            }
                            return;
                        }
                        this.setState({
                            submitError: true,
                            errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                            isLoading: false
                        });
                    });
                    return;
                } else {
                    this.setState({
                        submitError: true,
                        errorMessage: 'Sorry, there was a problem with your submission. Please try again.'
                    });
                }
                this.setState({
                    isLoading: false,
                });
            });
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
                            <h1>Log In</h1>
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
