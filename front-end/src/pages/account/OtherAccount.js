import React, { Component } from 'react';
import {Segment, Container} from 'semantic-ui-react';
import OtherProfile from "./OtherProfile"
import OtherTop from "./OtherTop"
import { url } from '../../Api';
import { getLoggedInUser } from '../../Authentication';

export default class OtherAccount extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        avatar: 'default',
        first_name: '',
        last_name: '',
        joined_in: '',
        user_type: '',
        posts: [],
        viewable: [],
        reviews: [],
        rating_overall: 0,
        rating_speed: 0,
        rating_reliability: 0,
        rating_service: 0
      },
      postList: [],
      switchPage: true,
      isLoading: false,
    };
  }

  componentDidMount() {
    fetch(url + 'user/' + this.props.match.params.userId).then(response => {
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
              <OtherTop
                avatar={this.state.user.avatar}
                firstName={this.state.user.first_name}
                lastName={this.state.user.last_name}
                joinedIn={this.state.user.joined_in}
                identity={this.state.user.user_type}
                rating={this.state.user.rating_overall}
              />
            </Segment>
            <Segment visible>
              {
                <OtherProfile
                  viewable={this.state.user.viewable.includes(getLoggedInUser()) || parseInt(this.props.match.params.userId) === getLoggedInUser()}
                  desc={this.state.user.description}
                  mobile={this.state.user.phone_number}
                  email={this.state.user.email}
                  avatar={this.state.user.avatar}
                  identity={this.state.user.user_type}
                  overall={this.state.user.rating_overall}
                  speed={this.state.user.rating_speed}
                  reliability={this.state.user.rating_reliability}
                  service={this.state.user.rating_service}
                  reviews={this.state.user.reviews}
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
