import React, { Component } from 'react';
import {Segment, Container} from 'semantic-ui-react';
import Profile from "./Profile"
import Top2 from "./Top2"

/**
 * Title: Account Dashboard
 * Author: Victor
 */
export default class AccountProfile extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        posts: []
      },
      postList: [],
      switchPage: true,
      isLoading: false,
    };
  }

  render() {
    return (
      <Container>
        <div style={{paddingBottom: 80}}>
          <Segment.Group stacked>
            <Segment inverted>
              <Top2
                avatar={this.state.user.avatar}
                firstName={this.state.user.first_name}
                lastName={this.state.user.last_name}
                date={this.state.user.date}
                identity={this.state.user.user_type}
                rating={this.state.user.rating}
              />
            </Segment>
            <Segment visible>
              {
                <Profile
                  name={this.state.user.first_name + ' ' + this.state.user.last_name}
                  mobile={this.state.user.mobile}
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