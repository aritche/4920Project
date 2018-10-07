import React, { Component } from 'react';
import {Segment, Container} from 'semantic-ui-react';
import { getLoggedInUser, logout } from '../../Authentication';
import { url } from '../../Api';
import Dashboard from "./Dashboard"
import Profile from "./Profile"
import Top from "./Top"
import m1 from '../../avatar/male1.jpg';
import m2 from '../../avatar/male2.jpg';
import m3 from '../../avatar/male3.jpg';
import m4 from '../../avatar/male4.jpg';
import m5 from '../../avatar/male5.jpg';
import m6 from '../../avatar/male6.jpg';
import m7 from '../../avatar/male7.jpg';
import f1 from '../../avatar/female1.jpg';
import f2 from '../../avatar/female2.jpg';
import f3 from '../../avatar/female3.jpg';
import f4 from '../../avatar/female4.jpg';
import f5 from '../../avatar/female5.jpg';
import f6 from '../../avatar/female6.jpg';
import f7 from '../../avatar/female7.jpg';

/**
 * Title: Account Dashboard
 * Author: Victor
 */
export default class Account extends Component {
    constructor() {
        super();

        this.state = {
          user: {
            avatar: f1,
            firstName: 'Agh',
            lastName: 'AAAAA',
            email: 'adjlk@asd',
            phone: '12l34235',
            desc: 'wtf',
            posts: []
          },
          postList: [],
          feeds: [{avatar: m1, name: "Allen", time: "3 hours ago", event: "Offered you a deal", detail: "Hey man I can do for $100"}],
          switchPage: true,
          isLoading: false,
        };
    }

    onUpdate = () => {
        this.setState({switchPage: true});
    };

    onProfile = () => {
        this.setState({switchPage: false});
    };

    onProfileUpdate = (newAvatar, firstName, lastName, email, phone, desc) => {
        let user = Object.assign({}, this.state.user);
        user.firstName = firstName;
        user.lastName = lastName;
        user.email= email;
        user.phone = phone;
        user.desc = desc;
        user.avatar = newAvatar;
        this.setState({user});
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
                <Segment style={{backgroundColor: "#193446"}}>
                  <Top
                    avatar={this.state.user.avatar}
                    firstName={this.state.user.first_name}
                    lastName={this.state.user.last_name}
                    date={this.state.user.date}
                    identity={this.state.user.user_type}
                    rating={this.state.user.rating}
                    update={this.onUpdate}
                    profileUpdate={this.onProfileUpdate}
                    profile={this.onProfile}
                  />
                </Segment>
                <Segment style={{backgroundColor: 'white'}}>
                  { this.state.switchPage ?
                    <Dashboard
                      history={this.props.history}
                      post={this.state.user.posts}
                      feed={this.state.feeds}
                    /> :
                    <Profile
                      avatar={this.state.user.avatar}
                      firstName={this.state.user.first_name}
                      lastName={this.state.user.last_name}
                      desc={this.state.user.desc}
                      mobile={this.state.user.mobile}
                      email={this.state.user.email}
                      delete={this.deleteAccount}
                    />
                  }
                </Segment>
              </Segment.Group>
            </div>
          </Container>
        )
    }
}
