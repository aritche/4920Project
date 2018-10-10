import React, { Component } from 'react';
import {Segment, Container} from 'semantic-ui-react';
import OtherProfile from "./OtherProfile"
import OtherTop from "./OtherTop"
import { url } from '../../Api';

/**
 * Title: Account Dashboard
 * Author: Victor
 */
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
        posts: []
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
                rating={this.state.user.rating}
              />
            </Segment>
            <Segment visible>
              {
                <OtherProfile
                  desc={this.state.user.description}
                  name={this.state.user.first_name + ' ' + this.state.user.last_name}
                  mobile={this.state.user.phone_number}
                  email={this.state.user.email}
                />
              }
            </Segment>
          </Segment.Group>
        </div>
      </Container>
    )
  }
}
