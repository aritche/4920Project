import React, { Component } from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';

export default class RemovalistDiscover extends Component {
    render() {
        return (
            <Segment attached style={{backgroundColor: "white", borderRadius: '4px'}}>
                <Header attached='top' size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}>
                Recommended Moves
                </Header>
                <Segment attached secondary>
                     
                </Segment>
            </Segment>
        )
    }
}
