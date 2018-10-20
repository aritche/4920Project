import React, { Component } from 'react';
import {Divider, Header, Message, Segment} from 'semantic-ui-react';
import Rating from './UserRating';

/**
 * Title: Account Dashboard
 * Author: Victor
 */
export default class OtherProfile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      open: false,
    };
  }

  close = () => {
    this.setState({open: false});
  };

  open = () => {
    this.setState({open: true});
  };

  render() {
    return (
      <div>
        <div>
          { !!this.props.desc &&
            <Header content={'User Description'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/> }

           {this.props.desc}
          <Header content={'User Information'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
          { this.props.viewable ?
              <Segment>
                <Header content={'Email Address:'} size={'medium'}/>
                  <p>{this.props.email}</p>
                <Divider/>
                { !!this.props.mobile &&
                  <div>
                    <Header content={'Mobile Number:'} size={'medium'}/>
                      <p>{this.props.mobile}</p>
                  </div>
                }
              </Segment>
            :
              <Message>
                <Message.Header>You don't have permission to view this user's private information.</Message.Header>
                <p>Private information is only shared with users who are directly involved with each other.</p>
              </Message>
          }
          <Header content={'Reviews'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
          {this.props.reviews === undefined || this.props.reviews.length === 0
            ?
            <Message>
              <Message.Header>This user has not received any reviews yet</Message.Header>
            </Message>
            :
              <Rating
                history={this.props.history}
                avatar={this.props.avatar}
                isMovee={this.props.identity === 'Movee'}
                overall={this.props.overall}
                service={this.props.service}
                reliability={this.props.reliability}
                speed={this.props.speed}
                reviews={this.props.reviews}
              />
          }
        </div>
      </div>
    )
  }
}