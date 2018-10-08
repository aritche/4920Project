import React, { Component } from 'react';
import CreateHome from './CreateHome';
import RecentMoves from './RecentMoves';
import HowItWorks from './HowItWorks';
import { Container } from 'semantic-ui-react';

export default class HomePage extends Component {
    render() {
        return (
            <Container>
                <CreateHome history={this.props.history}/>
                <HowItWorks />
                <RecentMoves />
            </Container>
        )
    }
}
