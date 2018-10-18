import React, { Component } from 'react';
import {Message, Header, Segment} from 'semantic-ui-react';
import FeedList from "./FeedList";
import PostList from './PostTable';
import PostRecordList from './PostRecordList';
import { getLoggedInUserType } from '../../Authentication';

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
          <Header content={'Post Collection'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>

          { getLoggedInUserType() === 'Movee' &&
            <Segment>
              {this.props.post.length === 0
                ?
                <Message>
                  <Message.Header>No posts to view</Message.Header>
                  <p>You have not created any posts yet.</p>
                </Message>
                :
                <PostList
                  history={this.props.history}
                  list={this.props.post}
                />
              }
            </Segment>
          }
          { getLoggedInUserType() === 'Removalist' &&
            <Segment>
              {this.props.postRecords.length === 0
                ?
                <Message>
                  <Message.Header>You have no posts to view.</Message.Header>
                </Message>
                :
                <PostRecordList
                  history={this.props.history}
                  list={this.props.postRecords}
                />
              }
            </Segment>
          }
      </div>
    )
  }
}
