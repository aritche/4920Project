import React, {Component} from 'react';
import CreateSignupForm from './CreateSignupForm';
import {Container} from 'semantic-ui-react';

export default class SignupPage extends Component {
  render() {
    return (
      <Container>
        <CreateSignupForm history={this.props.history}/>
      </Container>
    )
  }
}
