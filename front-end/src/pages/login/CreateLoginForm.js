import React, { Component } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';

export default class CreateLoginForm extends Component {
    constructor() {
        super();
        
        this.state = {
            username: '',
            password: ''
        }
    }
    
    onUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }
    
    attemptLogin = () => {
        alert(this.state.username + " has logged in with password " + this.state.password)
    }
    
    render() {
        return (
            <Grid.Row centered columns={4}>
                <h1>Log in</h1>
                <Form>
                    <Form.Field>
                        <Form.Input placeholder="Email" value={this.state.username} onChange={this.onUsernameChange} />
                        <Form.Input placeholder="Password" type='password' value={this.state.password} onChange={this.onPasswordChange} />
                    </Form.Field>
                    <Button color='green' type='submit' onClick={this.attemptLogin}>Log In</Button>
                </Form>
            </Grid.Row>
        )
    }
}
