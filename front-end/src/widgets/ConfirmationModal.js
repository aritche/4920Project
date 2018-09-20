import React, { Component } from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';

export default class ConfirmationModal extends Component {
    constructor() {
        super();

        this.state = {
            open: false
        };
    }

    close = () => {
        this.setState({open: false});
    };

    open = () => {
        this.setState({open: true});
    };

    confirm = () => {
        this.setState({open: false}, this.props.onConfirm);
    }

    render() {
        return (
            <Modal style={{width: 500}} trigger={
                this.props.buttonHtml?
                    this.props.buttonHtml
                :
                <Button onClick={this.open} size={this.props.buttonSize} negative style={this.props.buttonStyle} animated={this.props.buttonAnimated}>
                    { this.props.buttonContentHtml ?
                        this.props.buttonContentHtml
                        :
                        this.props.buttonText
                    }
                </Button>
                } open={this.state.open} onClose={this.close} closeIcon>
                <Modal.Content style={{paddingLeft: 100}}>
                    <Header size={'small'} content={ this.props.headerText }/>
                </Modal.Content>
                <Modal.Actions style={{paddingRight: 150}}>
                    <Button color='red' onClick={this.confirm}>
                    <Icon name='checkmark' /> Yes
                    </Button>
                    <Button color='green' onClick={this.close}>
                    <Icon name='remove' /> No
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}