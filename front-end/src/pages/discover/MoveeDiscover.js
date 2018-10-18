import React, { Component } from 'react';
import { Container, Segment, Header, Divider } from 'semantic-ui-react';
import AccountList from './AccountList';

export default class MoveeDiscover extends Component {
    render() {
        return (
            <Container style={{backgroundColor: "white", borderRadius: '4px'}}>
                <Segment>
                    <Header attached='top' size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}>
                    Recommended Removalists
                    </Header>
                    <Segment attached secondary>
                        <AccountList accounts={this.state.removalists}/>
                    </Segment>
                </Segment>

            </Container>
        )
    }
}
