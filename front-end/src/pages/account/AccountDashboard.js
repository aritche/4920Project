import React, { Component } from 'react';
import {Image, Segment, Container, Divider, Header, Rating, Table, Button, Icon, Item} from 'semantic-ui-react';
import { getLoggedInUser, logout } from '../../Authentication';
import { url } from '../../Api';
import avatar from './elliot.jpg'
import PostList from "./PostTable";
import FeedList from "./FeedList";

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
            <Segment inverted color={'blue'}>
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
                <Button
                  content={" Go to my profile"}
                  icon='right arrow'
                  iconPosition='left'
                  style={{marginLeft: "30%", marginTop: "9%", backgroundColor: 'transparent', width: "28%", height: "0%"}}
                  size={'massive'}/>
              </div>
            </Segment>
            <Segment>
              <Header content={'Recent Updates'} size={'huge'}/>
              <FeedList/>
              <Header content={'Post Collection'} size={'huge'}/>
              <PostList table={this.state.postList}/>
            </Segment>
          </Segment.Group>
        </div>
      </Container>
    )
  }
}