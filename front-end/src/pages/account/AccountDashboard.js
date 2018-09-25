import React, { Component } from 'react';
import {Image, Segment, Container, Divider, Header, Rating, Menu} from 'semantic-ui-react';
import { getLoggedInUser, logout } from '../../Authentication';
import { url } from '../../Api';
import avatar from './elliot.jpg'
import PostList from "./PostTable";
import FeedList from "./FeedList";
import ConfirmationModal from "../../widgets/ConfirmationModal";

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
      postList: []
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
          <Segment.Group stacked>
            <Segment inverted color={'black'}>
              <div style={{marginTop: '1%', display: 'flex'}}>
                <Segment circular size={'small'}
                         style={{paddingBottom: 1, paddingRight: 1, paddingTop: 1, paddingLeft: 1}}>
                  <Image src={avatar} circular size={'small'} bordered/>
                </Segment>
                <div style={{marginTop: "3%", marginLeft: "1%"}}>
                  <Header style={{color:'white'}} content={this.state.user.firstname + ' ' + this.state.user.lastname}
                          size={'huge'}/>
                  <Header style={{color:'white'}} content={'Movee joined in 2018'} size={'big'}/>
                  <Rating style={{}} maxRating={5} defaultRating={5} icon='star' size='huge' />
                </div>
                <Menu inverted secondary attached='top'
                      style={{height: "0%", width: "15%", marginLeft: "45%", marginTop: "11%"}}>
                  <Menu.Item name='Updates' size={'big'}/>
                  <Menu.Item name='Profile' size={'big'}/>
                </Menu>
              </div>
            </Segment>
            <Segment visible>
              <br/>
              <Header content={'Recent Updates'} size={'huge'}/>
              <FeedList/>
              <br/>
              <Header content={'Post Collection'} size={'huge'}/>
              <PostList table={this.state.postList}/>
              <br/>
              <div>
                <Header content={'User Information'} size={'huge'}/>
                <Header content={'Name:'} size={'medium'}/>
                <Divider/>
                <Header content={'Address:'} size={'medium'}/>
                <Divider/>
                <Header content={'Mobile Number:'} size={'medium'}/>
                <Divider/>
                <Header content={'Email Address:'} size={'medium'}/>
                <Divider/>
              </div>
              <ConfirmationModal
                buttonText='Delete Account'
                buttonSize='small'
                buttonStyle={{width: 150, height: 50}}
                headerText='Are you sure you want to delete your account?'
                onConfirm={this.deleteAccount}
              />
            </Segment>
          </Segment.Group>
        </div>
      </Container>
    )
  }
}