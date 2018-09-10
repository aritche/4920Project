import React, { Component } from 'react';
import Post from './Post';
import { Header, Icon, Item } from 'semantic-ui-react';

export default class PostList extends Component {
    render() {
        return (
            <div>
                <Header as='h2'>
                    <Icon name='file alternate' />
                    <Header.Content>Posts</Header.Content>
                </Header>
                <Item.Group divided link>
                {
                    this.props.posts.map(post => <Post post={post} />)
                }
                </Item.Group>
            </div>
        )
    }
}