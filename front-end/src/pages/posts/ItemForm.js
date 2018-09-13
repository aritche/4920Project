import React, { Component } from 'react';
import { Form, TextArea, Header, Modal, Button, Icon } from 'semantic-ui-react';

/**
 * Author: VW
 */
export default class ItemForm extends Component {

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSumbit = (e) => {
        alert(e.target.value.volume);
        this.props.handleAdd(e.target.value);
        e.preventDefault();
    };

    render() {
        return (
          <Modal trigger={
            <Button size='large' primary style={{width: 100, height: 40, zIndex: 0}} animated='fade'>
              <Button.Content visible>
                <Icon name={'plus square'}/>
              </Button.Content>
              <Button.Content hidden>Add An Item</Button.Content>
            </Button>
          } closeIcon>
            <Header> Add Item </Header>
            <Modal.Content>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input fluid label='Name'  placeholder='Item Name' onNameChange={this.onChange}/>
                  <Form.Input fluid label='Estimated Weight'  placeholder='Item Weight' onNameChange={this.onChange}/>
                  <Form.Input fluid label='Estimated Volume'  placeholder='Item Volume' onNameChange={this.onChange}/>
                  <Form.Input fluid label='Amount'  placeholder='Item Amount' onNameChange={this.onChange}/>
                </Form.Group>
                <Header content={'Item Description'} />
                <TextArea autoHeight onNameChange={this.onChange}/>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={this.onSumbit}>
                <Icon name='checkmark' /> Yes
              </Button>
              <Button color='red'>
                <Icon name='remove' /> No
              </Button>
            </Modal.Actions>
          </Modal>
        );
    }
}