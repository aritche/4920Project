import React, { Component } from 'react';
import { Form, Icon } from 'semantic-ui-react';

export default class ItemInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSubmit = address => {
  };

  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Name'  placeholder='Item Name'/>
          <Form.Input fluid label='Estimated Size'  placeholder='Item Size'/>
          <Form.Input fluid label='Estimated Volume'  placeholder='Item Volume'/>
          <Form.Input fluid label='Amount'  placeholder='Item Amount'/>
          <Form.Button icon style={{marginTop: 24}} color={'black'}>
            <Icon name='plus square' />
          </Form.Button>
        </Form.Group>
      </Form>
    );
  }
}