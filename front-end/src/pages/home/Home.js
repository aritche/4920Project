import React, {Component} from 'react';
import CreateHome from './CreateHome';
import RecentMoves from './RecentMoves';
import HowItWorks from './HowItWorks';
import {Container} from 'semantic-ui-react';

export default class HomePage extends Component {
  render() {
    return (
      <Container style={{boxShadow: '0px 2px 10px #000000', minHeight: '100vh'}}>
        <CreateHome history={this.props.history}/>
        <HowItWorks/>
        <RecentMoves/>
      </Container>
    )
  }
}
