import React, { Component } from 'react';
import { Header, Segment, Container, Image} from 'semantic-ui-react';
import avatar from './elliot.jpg'
import { getLoggedInUser, logout } from '../../Authentication';
import { url } from '../../Api';
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
              <Header size={'medium'} content={this.state.user.first_name + ' ' + this.state.user.last_name}
                      style={{marginTop: 20, marginRight: 400}}/>
              <Image src={avatar} size='small' circular />
              <br/>
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