import React, { Component } from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';

/**
 * Title: ErrorInputModel
 * Author: V.W.
 */
export default class ErrorInputModal extends Component {

  close = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Modal style={{width: 500}} open={this.props.pop} onClose={this.close} closeIcon>
        <Modal.Content style={{paddingLeft: 100}}>
          <Header size={'small'} content={ this.props.headerText } style={{marginLeft: '10%'}}/>
        </Modal.Content>
        <Modal.Actions style={{paddingRight: 180}}>
          <Button color='red' onClick={this.close}>
            <Icon name='checkmark' /> I see
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}