import React, { Component } from 'react';
import { Form, TextArea, Header, Modal, Button, Icon } from 'semantic-ui-react';

/**
 * Author: VW
 */
export default class ItemForm extends Component {
    constructor() {
      super();

      this.state = {
        open: false
      }
    }

    close = () => {
      this.setState({open: false});
    }

    open = () => {
      this.setState({open: true});
    }

    onSubmit = () => {
      //TODO: validation that fields are not empty
      this.props.addItem();
      this.close();
    };

    render() {
        return (
          <Modal trigger={
            <Button onClick={this.open} size='large' primary style={{width: 100, height: 40, zIndex: 0}} animated='fade'>
              <Button.Content visible>
                <Icon name={'plus square'}/>
              </Button.Content>
              <Button.Content hidden>Add An Item</Button.Content>
            </Button>
          } open={this.state.open} onClose={this.close} closeIcon>
            <Header> Add Item </Header>
            <Modal.Content>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input fluid label='Name'  placeholder='Item Name' onChange={(e) => this.props.onChange('name', e.target.value)}/>
                  <Form.Input fluid label='Estimated Weight'  placeholder='Item Weight' onChange={(e) => this.props.onChange('weight', e.target.value)}/>
                  <Form.Input fluid label='Estimated Volume'  placeholder='Item Volume' onChange={(e) => this.props.onChange('volume', e.target.value)}/>
                  <Form.Input fluid label='Amount'  placeholder='Item Amount' onChange={(e) => this.props.onChange('amount', e.target.value)}/>
                </Form.Group>
                <Header content={'Item Description'} />
                <TextArea autoHeight onChange={(e) => this.props.onChange('desc', e.target.value)}/>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={this.onSubmit}>
                <Icon name='checkmark' /> Yes
              </Button>
              <Button color='red' onClick={this.close}>
                <Icon name='remove' /> No
              </Button>
            </Modal.Actions>
          </Modal>
        );
    }
}