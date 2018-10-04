import React, { Component } from 'react';
import { Button, Modal, Icon, Form, Header, TextArea, Message } from 'semantic-ui-react';
import PositiveFloatInput from '../../widgets/PositiveFloatInput';
import { emptyString, isPositiveFloat } from '../../utils/ValidationUtils';
import moment from 'moment';
import { isLoggedIn, getLoggedInUser } from '../../Authentication';

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
        if (!isLoggedIn()) {
            this.setState({errorText: 'Must be logged in to make an offer'});
        } else if (!emptyString(this.state.desc) && isPositiveFloat(this.state.offer)) {
            this.props.onOffer(getLoggedInUser(), moment().calendar(), this.state.desc, true, this.state.offer);
            this.setState({desc: '', errorText: ''});
            this.props.close();
        } else {
            this.setState({errorText: 'Please make a valid offer and add a valid description'});
        }
    }

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
                    <Button color='green' onClick={this.onSubmit} >
                        <Icon name='checkmark' /> Yes
                    </Button>
                    <Button color='red' onClick={this.props.close}>
                        <Icon name='remove' /> No
                    </Button>
                </Modal.Actions>
            </Modal>)
    }
}