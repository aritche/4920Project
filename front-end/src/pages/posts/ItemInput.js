import React, { Component } from 'react';
import { Form, TextArea, Header } from 'semantic-ui-react';

export default class ItemInput extends Component {
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
          <Form.Input fluid label='Estimated Weight'  placeholder='Item Weight'/>
          <Form.Input fluid label='Estimated Volume'  placeholder='Item Volume'/>
          <Form.Input fluid label='Amount'  placeholder='Item Amount'/>
        </Form.Group>
        <Header content={'Item Description'} />
        <TextArea autoHeight />
      </Form>
    );
  }
}