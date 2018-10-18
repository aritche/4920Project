import React, { Component } from 'react';
import { Button, Modal, Icon, Form, Header, TextArea, Message } from 'semantic-ui-react';
import PositiveFloatInput from '../../widgets/PositiveFloatInput';
import { emptyString, isPositiveFloat } from '../../utils/ValidationUtils';

export default class OfferModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offer: props.budget ? props.budget : 0,
            desc: '',
            errorText: ''
        }
    }

    onSubmit = () => {
        if (!emptyString(this.state.desc) && isPositiveFloat(this.state.offer)) {
            this.props.onOffer(this.state.offer, this.state.desc);
            this.setState({desc: '', errorText: ''});
            this.props.close();
        } else {
            this.setState({errorText: 'Please make a valid offer and add a valid description'});
        }
    };

    onOfferChange = (value) => {
        this.setState({offer: value});
    };

    onDescChange = (value) => {
        this.setState({desc: value});
    };

    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.close}>
                <Modal.Header>Make an offer!</Modal.Header>
                <Modal.Content>
                    <Form>
                        <PositiveFloatInput label='Offer ($)' value={this.state.offer} float={true}
                                            placeholder='Offer' onChange={this.onOfferChange} />

                        <Header content={'Offer Description'} />
                        <Form.Field error={emptyString(this.state.desc)} control={TextArea} placeholder='Tell us more about why you best suit the job...'
                                    autoHeight value={this.state.desc} onChange={(e) => this.onDescChange(e.target.value)} />
                    </Form>
                    { this.state.errorText &&
                        <Message negative>
                            <Message.Header>{this.state.errorText}</Message.Header>
                        </Message>
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button style={{backgroundColor: '#193446', color: 'white', width: 120, height: 40}}
                            onClick={this.onSubmit} >
                        <Icon name='checkmark' /> Yes
                    </Button>
                    <Button style={{backgroundColor: '#22AABB', color: 'white', width: 120, height: 40}}
                            onClick={this.props.close}>
                        <Icon name='remove' /> No
                    </Button>
                </Modal.Actions>
            </Modal>)
    }
}