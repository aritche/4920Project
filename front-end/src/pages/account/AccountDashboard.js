import React, { Component } from 'react';
import {Button, Form, Header, TextArea, Segment, Container, Icon, Modal, Card, Image} from 'semantic-ui-react';
import avatar from './elliot.jpg'
/**
 * Title: Account Dashboard
 * Author: Victor
 */
export default class AccountDashboard extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      name: 'John Smith',
    }
  }

  close = () => {
    this.setState({open: false});
  };

  open = () => {
    this.setState({open: true});
  };

  deleteAccount = () => {

  };

  render() {
    return (
      <Container>
        <div style={{paddingBottom: 80}}>
          <Segment>
            <div style={{marginLeft: 450, marginBottom: 20}}>
              <Header size={'huge'} content={this.state.name} style={{marginTop: 20}}/>
              <Image src={avatar} size='small' circular />
              <br/>
              <Modal style={{width: 500}} trigger={
                <Button onClick={this.open} size='small' negative style={{width: 150, height: 50}}>
                  Delete Account
                </Button>
              } open={this.state.open} onClose={this.close} closeIcon>
                <Modal.Content style={{paddingLeft: 100}}>
                  <Header size={'small'} content={'Are you sure you want to delete your account?'}/>
                </Modal.Content>
                <Modal.Actions style={{paddingRight: 150}}>
                  <Button color='red' onClick={this.deleteAccount}>
                    <Icon name='checkmark' /> Yes
                  </Button>
                  <Button color='green' onClick={this.close}>
                    <Icon name='remove' /> No
                  </Button>
                </Modal.Actions>
              </Modal>
            </div>
          </Segment>

        </div>
      </Container>

    )
  }

}