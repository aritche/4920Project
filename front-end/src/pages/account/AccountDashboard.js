import React, { Component } from 'react';
import { Button, Form, Header, TextArea, Segment } from 'semantic-ui-react';

/**
 * Title: Account Dashboard
 * Author: Victor
 */
export default class AccountDashboard extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }

  }

  render() {
    return (
      <div>
        <Segment>
          <Header content={"miao"} />
        </Segment>
      </div>
    )
  }

}