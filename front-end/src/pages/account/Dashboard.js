import React, { Component } from 'react';
import {Button, Header, Menu} from 'semantic-ui-react';
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
          <Header content={'Recent Updates'} size={'huge'}/>
          <FeedList feeds={this.props.feed}/>
          <br/>
          <Header content={'Post Collection'} size={'huge'}/>
          <PostList history={this.props.history} list={this.props.post}/>
          <br/>
          <Button.Group>
            <Button as={Link} to={'/create-post'} primary style={{backgroundColor: '#E2B49A'}}>Create Post</Button>
            <Button.Or />
            <Button as={Link} to={'/posts'} style={{backgroundColor: '#E9C77B'}} secondary>Search Post</Button>
          </Button.Group>
      </div>
    )
  }
}
