import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Signup from '../signup/CreateSignupForm';

export default class CreateLoginForm extends Component {
    constructor() {
        super();

        this.state = {
            errorMessage: 'An error has occurred.'
        }
    };

    render() {
        return (
            <div>
                Home page (ari is working on this at the moment)
                <Signup/>
            </div>
        )
    }
}
