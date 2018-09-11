import React, { Component } from 'react';
import CreateLoginForm from './CreateLoginForm';
import { Container, Grid } from 'semantic-ui-react';

export default class LoginPage extends Component {
    render() {
        return (
            <Container>
                <CreateLoginForm />
            </Container>
        )
    }
}
