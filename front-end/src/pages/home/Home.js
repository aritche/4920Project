import React, { Component } from 'react';
import CreateHome from './CreateHome';
import RecentMoves from './RecentMoves';
import HowItWorks from './HowItWorks';
import { Segment } from 'semantic-ui-react';

export default class HomePage extends Component {
    render() {
        return (
            <Segment attached style={{padding: 0}}>
                <CreateHome history={this.props.history}/>
                <RecentMoves />
                <HowItWorks />
            </Segment>
        )
    }
}
