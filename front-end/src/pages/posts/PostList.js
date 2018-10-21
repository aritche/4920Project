import React, {Component} from 'react';
import Post from './Post';
import {Item, Message} from 'semantic-ui-react';

export default class PostList extends Component {
  render() {
    return (
      this.props.posts && this.props.posts.length > 0 ?
        <div className="list-container">

          <Item.Group divided link>
            {
              this.props.posts.map(post => <Post key={post.id} post={post}/>)
            }
          </Item.Group>
        </div>
        :
        <Message>
          <Message.Header>No posts to view</Message.Header>
          <p>There are no posts currently with your search criteria, why not create one?</p>
        </Message>
    )
  }
}