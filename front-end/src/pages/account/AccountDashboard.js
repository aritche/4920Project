import React, { Component } from 'react';
import {Button, Form, Header, TextArea, Segment, Container, Icon, Modal, Card, Image} from 'semantic-ui-react';
import avatar from './elliot.jpg'
import { getLoggedInUser } from '../../Authentication';
import { url } from '../../Api';


/**
 * Title: Account Dashboard
 * Author: Victor
 */
export default class AccountDashboard extends Component {
    constructor() {
      super();

    this.state = {
      isLoading: false,
      open: false,
      user: {},
    };
  }

    close = () => {
        this.setState({open: false});
    };

    open = () => {
        this.setState({open: true});
    };

  deleteAccount = () => {
    fetch(url + '/delete-account').catch(error => console.error('Error', error));
    this.props.history.push('/login');
  };

  componentDidMount() {
    fetch(url + 'user/' + getLoggedInUser()).then(response => {
      if (response.status === 200) {
        response.json().then(obj => {
          this.setState({
            user: obj,
            isLoading: false
          })
        });
      } else {
        this.setState({
          errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
          isLoading: false
        });
      }
    });
  }

  render() {
    return (
      <Container>
        <div style={{paddingBottom: 80}}>
          <Segment>
            <div style={{marginBottom: 20}}>
              <Header size={'medium'} content={this.state.user.first_name + ' ' + this.state.user.last_name}
                      style={{marginTop: 20, marginRight: 400}}/>
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