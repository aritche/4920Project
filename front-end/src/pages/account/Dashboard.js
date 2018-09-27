import React, { Component } from 'react';
import {Header} from 'semantic-ui-react';
import PostList from "./PostTable";
import FeedList from "./FeedList";

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
          <PostList list={this.props.post}/>
          <br/>
      </div>
    )
  }
}