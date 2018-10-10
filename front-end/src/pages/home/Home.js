import React, { Component } from 'react';
import CreateHome from './CreateHome';
import RecentMoves from './RecentMoves';
import HowItWorks from './HowItWorks';
import { Container } from 'semantic-ui-react';

export default class HomePage extends Component {
    render() {
        return (
            <Container style={{boxShadow: '2px 2px 2px #000000'}}>
                <CreateHome history={this.props.history}/>
                <HowItWorks />
                <RecentMoves />
            </Container>
        )
    }
}
