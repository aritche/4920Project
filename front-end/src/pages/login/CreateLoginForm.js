import React, { Component } from 'react';
import { Button, Form, Grid, Message } from 'semantic-ui-react';

export default class CreateLoginForm extends Component {
    constructor() {
        super();
        
        this.state = {
            email: '',
            password: ''
        }
    }
    
    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }
    
    attemptLogin = () => {
        alert(this.state.email + " has logged in with password " + this.state.password)
    }
    
    render() {
        return (
            <Grid centered columns={2}>
                <Grid.Row centered columns={2}>
                <h1>Log in</h1>
                <Form>
                    <Form.Field>
                        <Form.Input placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
                        <Form.Input placeholder="Password" type='password' value={this.state.password} onChange={this.onPasswordChange} />
                    </Form.Field>
                    <Button color='green' type='submit' onClick={this.attemptLogin}>Log In</Button>
                </Form>
                </Grid.Row>
                <Message error header='Unable to Log In' content='This is where an error will be displayed if login is unsuccessful'/>
            </Grid>
        )
    }
}
