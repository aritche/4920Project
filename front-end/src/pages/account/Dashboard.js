import React, { Component } from 'react';
import {Button, Message, Header, Segment} from 'semantic-ui-react';
import FeedList from "./FeedList";
import PostList from './PostTable';
import {Link} from 'react-router-dom';
import { getLoggedInUserType } from '../../Authentication';
import { userType } from '../../constants';

/**
 * Title: Dashboard
 * Author: Victor
 */
export default class Dashboard extends Component {

  render() {
    return (
      <div>
          <Header content={'Recent Updates'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
          <Segment>
            {this.props.updates.length === 0
              ?
              <Message>
                <Message.Header>No update to view</Message.Header>
                <p>There are no update at the moment.</p>
              </Message>
              :
              <FeedList feeds={this.props.updates} history={this.props.history}/>
            }
          </Segment>
          <br/>
          {this.props.isMovee
            ?
            <Header content={'Post Collection'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
            :
            <Header content={'Offered Posts'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
          }

          <Segment>
            {this.props.post.length === 0
              ?
              <Message>
                <Message.Header>No post to view</Message.Header>
                <p>There are no post at the moment.</p>
              </Message>
              :
              <PostList
                history={this.props.history}
                list={this.props.post}
              />
            }
          </Segment>
          <br/>
          { getLoggedInUserType() === userType.MOVEE ?
            <Button.Group>
              <Button as={Link} to={'/create-post'} style={{backgroundColor: '#193446', color: 'white',
                width: 130, height: 38}}>Create Post</Button>
              <Button.Or />
              <Button as={Link} to={'/posts'} style={{backgroundColor: '#22AABB', color: 'white',
                width: 130, height: 38}}>Search Posts</Button>
            </Button.Group>
          :
            <Button as={Link} to={'/posts'} style={{backgroundColor: '#22AABB', color: 'white',
                width: 130, height: 38}}>Search Posts</Button>
          }
      </div>
    )
  }
}
