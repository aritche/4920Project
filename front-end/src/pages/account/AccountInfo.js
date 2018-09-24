import React, { Component } from 'react';
import {Image, Segment, Container, Divider, Header, Rating} from 'semantic-ui-react';
import { getLoggedInUser, logout } from '../../Authentication';
import { url } from '../../Api';
import avatar from './elliot.jpg'
import ConfirmationModal from '../../widgets/ConfirmationModal';

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
    this.setState({isLoading: true});
    fetch(url + 'delete-account', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userId': this.state.user.id
      })
    }).then(response => {
      if (response.status === 200) {
        response.json().then(obj => {
          if (obj.success) {
            logout();
            this.props.history.push('/login');
          } else {
            this.setState({
              errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
              isLoading: false
            });
          }
        });
      } else {
        this.setState({
          errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
          isLoading: false
        });
      }
    });
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
              <Segment inverted color={'black'}>
                <div style={{marginLeft: '40%'}}>
                  <Image src={avatar} circular size={'small'}/>
                  <Header style={{color:'white'}} content={this.state.user.firstname + ' ' + this.state.user.lastname}
                          size={'big'}/>
                  <Rating style={{marginRight: 15}} maxRating={5} defaultRating={5} icon='star' size='massive' />
                </div>
              </Segment>
              <Divider />
              <ConfirmationModal
                buttonText='Delete Account'
                buttonSize='small'
                buttonStyle={{width: 150, height: 50}}
                headerText='Are you sure you want to delete your account?'
                onConfirm={this.deleteAccount}
              />
            </div>
          </Segment>
        </div>
      </Container>
    )
  }
}