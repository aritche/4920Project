import React, { Component } from 'react';
import {Button, Header, Segment} from 'semantic-ui-react';
import PostList from "./PostTable";
import FeedList from "./FeedList";
import {Link} from "react-router-dom";

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
            <FeedList feeds={this.props.updates} history={this.props.history}/>
          </Segment>
          <br/>
          <Header content={'Post Collection'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
          <Segment>
            <PostList history={this.props.history} list={this.props.post}/>
          </Segment>
          <br/>
          <Button.Group>
            <Button as={Link} to={'/create-post'} style={{backgroundColor: '#193446', color: 'white',
              width: 130, height: 38}}>Create Post</Button>
            <Button.Or />
            <Button as={Link} to={'/posts'} style={{backgroundColor: '#22AABB', color: 'white',
              width: 130, height: 38}}>Search Posts</Button>
          </Button.Group>
      </div>
    )
  }
}
