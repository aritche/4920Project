import React, { Component } from 'react';
import { Form, TextArea, Header, Modal, Button, Icon } from 'semantic-ui-react';
import { isPositiveInteger, isZero, emptyString, isPositiveFloat } from '../../utils/ValidationUtils';
import PositiveFloatInput from '../../widgets/PositiveFloatInput';
import ErrorInputModal from '../../widgets/ErrorInputModal';

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
            activeForm: false
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
        this.setState({weight: value});
    };

    onVolumeChange = (value) => {
        this.setState({volume: value});
    };

    onDescChange = (value) => {
      this.setState({desc: value});
    };

    onAmountChange = (value) => {
        if (value === '' || isZero(value)) {
            value = 1;
        }

        if (isPositiveInteger(value)) {
            this.setState({amount: parseInt(value, 10)});
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
        else {

        }
    };

    validation = () => {
        const { weight, volume, amount, desc} = this.state;
        return !this.nameValid() || isZero(weight) || !isPositiveFloat(weight) || isZero(volume) || !isPositiveFloat(volume) || isZero(amount) || emptyString(desc);
    };

    nameValid = () => {
        return !emptyString(this.state.name) && this.props.itemNames.indexOf(this.state.name) === -1;
    };

    onFormPopClose = () => {
        this.setState({activeForm: false});
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
                    <Form.Input fluid error={!this.nameValid()} placeholder='Item Name' value={this.state.name} onChange={(e) => this.onNameChange(e.target.value)}/>
                  </Form.Field>

                  <PositiveFloatInput label='Weight (kg)' value={this.state.weight} float={true}
                                      placeholder='Item Weight' onChange={this.onWeightChange} />

                  <PositiveFloatInput labelHtml={<label>Volume m<sup>3</sup></label>} value={this.state.volume} 
                                    float={true}  placeholder='Item Volume' onChange={this.onVolumeChange} />

                  <Form.Field>
                    <label>Amount</label>
                    <Form.Input fluid placeholder='Item Amount' value={this.state.amount}
                                onChange={(e) => this.onAmountChange(e.target.value)}/>
                  </Form.Field>
                </Form.Group>
                <Header content={'Item Description'} />
                <Form.Field error={emptyString(this.state.desc)} control={TextArea} placeholder='Tell us more about the item...' 
                            autoHeight value={this.state.desc} onChange={(e) => this.onDescChange(e.target.value)} />
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

            <ErrorInputModal
              pop={this.state.activeForm}
              headerText={'Please fill every field of this form'}
              onClose={this.onFormPopClose}
            />
          </Modal>
        );
    }
}