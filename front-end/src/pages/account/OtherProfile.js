import React, { Component } from 'react';
import {Divider, Header, Message, Segment} from 'semantic-ui-react';
import Reviews from './PastReviews'
import PastPosts from "./PastPosts";

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
          <Segment>
            <Header content={'Name:'} size={'medium'}/>
              {this.props.name}
            <Divider/>
            <Header content={'Email Address:'} size={'medium'}/>
              {this.props.email}
            <Divider/>
            { !!this.props.mobile &&
              <div>
                <Header content={'Mobile Number:'} size={'medium'}/>
                  {this.props.mobile}
                <Divider/>
              </div>
            }
          </Segment>
          <Header content={'Past Record'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
          {this.props.pastPosts === undefined || this.props.pastPosts.length === 0
          ?
            <Message>
              <Message.Header>No post history to view</Message.Header>
              <p>This user haven't made or offered on any posts.</p>
            </Message>
          :
            <PastPosts
              list={this.props.pastPosts}
            />
          }
          <Header content={'Past Rating'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>\
          {this.props.reviews === undefined || this.props.reviews.length === 0
            ?
            <Message>
              <Message.Header>No review history</Message.Header>
              <p>This user haven't received any reviews.</p>
            </Message>
            :
            <Reviews
              reviews={[]}
            />
          }
        </div>
      </div>
    )
  }
}