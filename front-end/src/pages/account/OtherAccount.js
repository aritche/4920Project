import React, { Component } from 'react';
import {Segment, Container} from 'semantic-ui-react';
import OtherProfile from "./OtherProfile"
import OtherTop from "./OtherTop"
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
export default class OtherAccount extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        avatar: m1,
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
            <Segment style={{backgroundColor: "#193446"}}>
              <OtherTop
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
                <OtherProfile
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
