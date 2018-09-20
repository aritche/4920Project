import React, { Component } from 'react';
import { Form, TextArea, Header, Modal, Button, Icon, Input } from 'semantic-ui-react';
import { isPositiveInteger, isZero } from '../../utils/ValidationUtils';

/**
 * Author: VW
 */
export default class ItemForm extends Component {
    constructor() {
      super();

      this.state = {
        open: false,
        name: '',
        weight: 0,
        volume: 0,
        desc: '',
        amount: 1,
      }
    }

    close = () => {
      this.setState({open: false});
    };

    open = () => {
      this.setState({
        open: true,
        name: '',
        weight: 0,
        volume: 0,
        desc: '',
        amount: 1,
      });
    };

    onNameChange = (value) => {
      this.setState({name: value});
    };

    onWeightChange = (value) => {
      if (value === '') {
        value = 0;
      }
      if (isPositiveInteger(value)) {
        this.setState({weight: parseInt(value)});
      }
    };

    onVolumeChange = (value) => {
      if (value === '') {
        value = 0;
      }
      if (isPositiveInteger(value)) {
        this.setState({volume: parseInt(value)});
      }
    };

    onDescChange = (value) => {
      this.setState({desc: value});
    };

    onAmountChange = (value) => {
      if (value === '' || isZero(value)) {
        value = 1;
      }

      if (isPositiveInteger(value)) {
        this.setState({amount: parseInt(value)});
      }
    };

    onSubmit = () => {
      //TODO: validation that fields are not empty
      // Make sure name is unique
      if (!this.validation()) {
          const { name, weight, volume, desc, amount } = this.state;
          this.props.addItem(name, weight, volume, desc, amount);
          this.close();
      }
    };

    validation = () => {
        const {name, weight, volume, amount, desc} = this.state;
        return (name === "") || isZero(weight) || isZero(volume) || isZero(amount) || (desc === "");
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
                  <Form.Field>
                    <label>Name</label>
                    <Input fluid placeholder='Item Name' value={this.state.name} onChange={(e) => this.onNameChange(e.target.value)}/>
                  </Form.Field>

                  <Form.Field>
                    <label>Weight</label>
                    <Input fluid label={{ basic: true, content: 'kg' }} value={this.state.weight}
                                labelPosition='right'  placeholder='Item Weight'
                                onChange={(e) => this.onWeightChange(e.target.value)}/>
                  </Form.Field>

                  <Form.Field>
                    <label>Volume</label>
                    <Input fluid label={{ basic: true, content: 'm^3' }} value={this.state.volume}
                                labelPosition='right'  placeholder='Item Volume'
                                onChange={(e) => this.onVolumeChange(e.target.value)}/>
                  </Form.Field>

                  <Form.Field>
                    <label>Amount</label>
                    <Input fluid placeholder='Item Amount' value={this.state.amount}
                                onChange={(e) => this.onAmountChange(e.target.value)}/>
                  </Form.Field>
                </Form.Group>
                <Header content={'Item Description'} />
                <TextArea autoHeight value={this.state.desc} onChange={(e) => this.onDescChange(e.target.value)}/>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={this.onSubmit} disabled={this.validation()}>
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