import React, { Component } from 'react';
import { Button, Form, Grid, Message } from 'semantic-ui-react';

export default class CreateSignupForm extends Component {
    constructor() {
        super();
        
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
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
        alert(this.state.firstName + " " + this.state.lastName + " has signed up with " + this.state.email + " and password: " + this.state.password)
    }
    
    render() {
        return (
            <Grid centered columns={2}>
                <Grid.Row centered columns={2}>
                <h1>Join the Community!</h1>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input placeholder="First Name" value={this.state.firstName} onChange={this.onFirstNameChange} />
                        <Form.Input placeholder="Last Name" value={this.state.lastName} onChange={this.onLastNameChange} />
                    </Form.Group>
                    <Form.Input placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
                    <Form.Input placeholder="Password" type='password' value={this.state.password} onChange={this.onPasswordChange} />
                    <Button color='green' type='submit' onClick={this.attemptSignup}>Sign up</Button>
                </Form>
                </Grid.Row>
                <Message error header='Unable to Sign Up' content='This is where an error will be displayed if signup is unsuccessful'/>
            </Grid>
        )
    }
}
