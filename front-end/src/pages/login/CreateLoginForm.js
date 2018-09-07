import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

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
             <Form>
                <Form.Field>
                    <label>Username:</label>
                    <input placeholder='Username' value={this.state.username} onChange={this.onUsernameChange} />
                    <label>Password:</label>
                    <input placeholder='Password' value={this.state.password} onChange={this.onPasswordChange} />
                </Form.Field>
                <Button type='submit' onClick={this.attemptLogin}>Log In</Button>
             </Form>
        )
    }
}
