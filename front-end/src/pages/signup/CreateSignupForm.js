import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { Button, Form, Grid, Message } from 'semantic-ui-react';
import { url } from '../../Api';
import { updateAuthentication } from '../../Authentication';

export default class CreateSignupForm extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            isLoading: false,
            formError: '',
            submitError: false
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
        this.setState({isLoading: true});

        // Input validation
        var success =
            this.state.firstName.length > 0
            && this.state.lastName.length > 0
            && this.state.password.length >= 6;

        if (!success) {
            this.setState({submitError: true});
        }


        console.log('ABOUT TO POST TO BACKEND');
        // Connect to backend
        fetch(url + 'user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'firstName': this.state.firstName,
                'lastName': this.state.lastName,
                'email': this.state.email,
                'password': this.state.password
            })
        }).then(response => {
            console.log('response');
            console.log(response);
            if (response.status === 400) {
                response.json().then(obj => {
                    this.setState({
                        submitError: true,
                        formError: obj.error
                    });
                });
            } else if (response.status === 200) {
                response.json().then(obj => {
                    console.log(obj);
                    if (obj.success) {
                        updateAuthentication(true);
                        this.props.history.push('/');
                    } else {
                        this.setState({
                            submitError: true,
                            formError: 'Sorry, there was a problem with your submission. Please try again.',
                            isLoading: false
                        });
                    }
                });
                return;
            } else {
                this.setState({
                    submitError: true,
                    formError: 'Sorry, there was a problem with your submission. Please try again.'
                });
            }
            this.setState({
                isLoading: false,
            });
        });
    }

    render() {
        return (
            <Grid centered columns={2}>
                <Grid.Row centered columns={2}>
                <h1>Join the Community!</h1>
                <Form error={this.state.submitError}>
                    <Form.Group widths='equal'>
                        <Form.Input placeholder="First Name" value={this.state.firstName} onChange={this.onFirstNameChange} />
                        <Form.Input placeholder="Last Name" value={this.state.lastName} onChange={this.onLastNameChange} />
                    </Form.Group>
                    <Form.Input placeholder="Email" type='email' value={this.state.email} onChange={this.onEmailChange} />
                    <Form.Input placeholder="Password" type='password' value={this.state.password} onChange={this.onPasswordChange} />
                    <Button disabled={this.state.isLoading} color='green' type='submit' onClick={this.attemptSignup}>{this.state.isLoading ? <ReactLoading type="spin" color="#000000" height={25} width={25}/> : "Sign up"}</Button>
                    <Message error header='Unable to Sign Up' content={this.state.formError === '' ? 'Something went wrong, please try again.' : this.state.formError } />
                </Form>
                </Grid.Row>
            </Grid>
        )
    }
}
