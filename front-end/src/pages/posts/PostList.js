import React, { Component } from 'react';
import Post from './Post';
import { Item } from 'semantic-ui-react';

export default class PostList extends Component {
    render() {
        return (
            <div className="list-container">
                <Item.Group divided link>
                {
                    this.props.posts.map(post => <Post post={post} />)
                }
                </Item.Group>
            </div>
        )
    }
}