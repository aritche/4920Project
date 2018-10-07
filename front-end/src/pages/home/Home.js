import React, { Component } from 'react';
import CreateHome from './CreateHome';
import RecentMoves from './RecentMoves';
import HowItWorks from './HowItWorks';
import { Segment, Container } from 'semantic-ui-react';

export default class HomePage extends Component {
    render() {
        return (
            <Container>
                <br/>
                <CreateHome history={this.props.history}/>
                <HowItWorks />
                <RecentMoves />
            </Container>
        )
    }
}
