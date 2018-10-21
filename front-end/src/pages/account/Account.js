import React, { Component } from 'react';
import {Segment, Container} from 'semantic-ui-react';
import { getLoggedInUser, logout } from '../../Authentication';
import { url } from '../../Api';
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Top from "./Top";
import { isOnAccountDashboardPage, setOnAccountDashboardPage } from '../../UserSettings'

export default class Account extends Component {
    constructor() {
        super();

        this.state = {
          user: {
            avatar: 'default',
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            description: '',
            posts: [],
            reviews: [],
            post_records: [],
            joined_in: '',
            rating: {overall: 3},
          },
          updates: [],
          postList: [],
          switchPage: isOnAccountDashboardPage(),
          isLoading: false,
        };

        this.loadUser = this.loadUser.bind(this);
    }

    onUpdate = () => {
        this.setState({switchPage: true});
        setOnAccountDashboardPage(true);
    };

    onProfile = () => {
        this.setState({switchPage: false});
        setOnAccountDashboardPage(false);
    };

    onProfileUpdate = (newAvatar, firstName, lastName, email, phone, desc) => {
        fetch(url + 'edit-account', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'userId': this.state.user.id,
            'avatar': newAvatar,
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'phoneNumber': phone,
            'description': desc
          })
        }).then(response => {
          window.location.reload();
        });
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

    loadUser() {
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

    componentDidMount() {
      fetch(url + 'user/' + getLoggedInUser()).then(response => {
        if (response.status === 200) {
          response.json().then(obj => {
            this.setState({
              user: obj,
              updates: obj.updates,
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
            <div style={{paddingBottom: 80, minHeight: '100vh'}}>
              <Segment.Group stacked style={{boxShadow: '2px 2px 2px #000000'}}>
                <Segment style={{backgroundColor: "#193446"}}>
                  <Top
                    switchPage={this.state.switchPage}
                    avatar={this.state.user.avatar}
                    firstName={this.state.user.first_name}
                    lastName={this.state.user.last_name}
                    email={this.state.user.email}
                    phone={this.state.user.phone_number}
                    desc={this.state.user.description}
                    joinedIn={this.state.user.joined_in}
                    identity={this.state.user.user_type}
                    rating={this.state.user.rating_overall}
                    update={this.onUpdate}
                    profileUpdate={this.onProfileUpdate}
                    profile={this.onProfile}
                  />
                </Segment>
                <Segment style={{backgroundColor: 'white'}}>
                  { this.state.switchPage
                    ?
                    <Dashboard
                      history={this.props.history}
                      post={this.state.user.posts}
                      updates={this.state.updates}
                      postRecords={this.state.user.post_records}
                      loadPostRecords={this.loadUser}
                    />
                    :
                    <Profile
                      avatar={this.state.user.avatar}
                      firstName={this.state.user.first_name}
                      lastName={this.state.user.last_name}
                      desc={this.state.user.description}
                      mobile={this.state.user.phone_number}
                      email={this.state.user.email}
                      identity={this.state.user.identity}
                      overall={this.state.user.rating_overall}
                      service={this.state.user.rating_service}
                      reliability={this.state.user.rating_reliability}
                      speed={this.state.user.rating_speed}
                      reviews={this.state.user.reviews}
                      delete={this.deleteAccount}
                      history={this.props.history}
                    />
                  }
                </Segment>
              </Segment.Group>
            </div>
          </Container>
        )
    }
}
