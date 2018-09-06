import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import LoginForm from './LoginForm';

class Login extends Component {
    constructor() {
        super();
    };

    render() {
        return(
            <Row>
                <Button bsStyle="primary">Login</Button>
                <Button bsStyle="primary">Sign up</Button>
            </Row>
        );
    };
};

export default Login;