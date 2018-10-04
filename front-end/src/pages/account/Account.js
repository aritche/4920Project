import React, { Component } from 'react';
import {Segment, Container} from 'semantic-ui-react';
import { getLoggedInUser, logout } from '../../Authentication';
import { url } from '../../Api';
import Dashboard from "./Dashboard"
import Profile from "./Profile"
import Top from "./Top"

/**
 * Title: Account Dashboard
 * Author: Victor
 */
export default class Account extends Component {
    constructor() {
        super();

        this.state = {
          user: {
            posts: []
          },
          postList: [],
          feeds: [{name: "Allen", time: "3 hours ago", event: "Offered you a deal", detail: "Hey man I can do for $100"}],
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
                <Segment inverted>
                  <Top
                    firstName={this.state.user.first_name}
                    lastName={this.state.user.last_name}
                    date={this.state.user.date}
                    identity={this.state.user.user_type}
                    rating={this.state.user.rating}
                    update={this.onUpdate}
                    profile={this.onProfile}
                  />
                </Segment>
                <Segment visible>
                  { this.state.switchPage ?
                    <Dashboard
                      history={this.props.history}
                      post={this.state.user.posts}
                      feed={this.state.feeds}
                    /> :
                    <Profile
                      name={this.state.user.firstname + ' ' + this.state.user.lastname}
                      address={this.state.user.address}
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