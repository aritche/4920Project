import React, { Component } from 'react';
import { Header, Container, Segment } from 'semantic-ui-react';
import { getLoggedInUserType } from '../../Authentication';
import { userType } from '../../constants';
import MoveeDiscover from './MoveeDiscover';
import RemovalistDiscover from './RemovalistDiscover';

export default class Discover extends Component {
    render() {
        return (
            <Container style={{minHeight: '100vh'}}>
                <Segment.Group stacked>
                    <Segment style={{color: 'white', backgroundColor: "#193446"}}>
                        <Header as='h1' style={{backgroundColor: '#193446', color: 'white'}}>
                            uMove Discovery
                        </Header>
                    </Segment>
                    {
                        getLoggedInUserType() === userType.MOVEE ?
                            <MoveeDiscover/>
                        :
                            <RemovalistDiscover/>
                    }
                </Segment.Group>
            </Container>
        )
    }
}
