import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { isLoggedIn, getLoggedInUser, getLoggedInUserType } from '../../Authentication';
import { userType } from '../../constants';
import MoveeDiscover from './MoveeDiscover';
import RemovalistDiscover from './RemovalistDiscover';

export default class Discover extends Component {
    render() {
        return (
            <Container style={{boxShadow: '0px 2px 10px #000000', minHeight: '100vh'}}>
                {
                    getLoggedInUserType() === userType.MOVEE ?
                        <MoveeDiscover/>
                    :
                        <RemovalistDiscover/>
                }
            </Container>
        )
    }
}
