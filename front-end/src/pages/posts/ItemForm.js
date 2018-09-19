import React, { Component } from 'react';
import { Form, TextArea, Header, Modal, Button, Icon, Input } from 'semantic-ui-react';

/**
 * Author: VW
 */
export default class ItemForm extends Component {
    constructor() {
      super();

      this.state = {
        open: false,
        name: '',
        weight: '',
        volume: '',
        desc: '',
        amount: '',
      }
    }

    close = () => {
      this.setState({open: false});
    };

    open = () => {
      this.setState({open: true});
    };

    onNameChange = (value) => {
      this.setState({name: value});
    };

    onWeightChange = (value) => {
        this.setState({weight: value});
    };

    onVolumeChange = (value) => {
        this.setState({volume: value});
    };

    onDescChange = (value) => {
      this.setState({desc: value});
    };

    onAmountChange = (value) => {
      this.setState({amount: value});
      alert(this.state.amount);
    };

    onSubmit = () => {
      //TODO: validation that fields are not empty
      // Make sure name is unique
      if (!this.validation()) {
          const { name, weight, volume, desc, amount } = this.state;
          this.props.addItem(name, weight, volume, desc, amount);
          this.close();
      }
      else {
          alert(this.validation);
          alert(this.state.name + " " + this.state.weight + " " + this.state.volume + " " + this.state.desc);
          alert("Please fill all fields")
      }
    };

    validation = () => {
        const {name, weight, volume, amount, desc} = this.state;
        return (name === "") || (weight === "") || (volume === "") || (amount === "") || (desc === "");
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
                <div style={{display: 'flex'}}>
                  <Input fluid placeholder='Item Name' onChange={(e) => this.onNameChange(e.target.value)}
                              style={{width: 200}}/>
                  <span style={{width: 20}}/>
                  <Input fluid label={{ basic: true, content: 'kg' }}
                              labelPosition='right'  placeholder='Item Weight'
                              onChange={(e) => this.onWeightChange(e.target.value)} style={{width: 200}}/>
                  <span style={{width: 20}}/>
                  <Input fluid label={{ basic: true, content: 'm^3' }}
                              labelPosition='right'  placeholder='Item Volume'
                              onChange={(e) => this.onVolumeChange(e.target.value)} style={{width: 200}}/>
                  <span style={{width: 20}}/>
                  <Input fluid placeholder='Item Amount'
                              onChange={(e) => this.onAmountChange(e.target.value)} style={{width: 200}}/>
                </div>
                <Header content={'Item Description'} />
                <TextArea autoHeight onChange={(e) => this.onDescChange(e.target.value)}/>
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