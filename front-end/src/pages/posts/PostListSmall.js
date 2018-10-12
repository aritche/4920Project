import React, { Component } from 'react';
import PostSmall from './PostSmall';
import { Item, Message, Grid } from 'semantic-ui-react';

export default class PostListSmall extends Component {
    render() {
        return (
                this.props.posts && this.props.posts.length > 0 ?
                    <div className="list-container">
                    
                        <Grid divided>
                            <Grid.Column>
                                {
                                    this.props.posts.map(post => <PostSmall key={post.id} post={post} />)
                                }
                            </Grid.Column>
                        </Grid>
                    </div>
                :
                <Message>
                    <Message.Header>No posts to view</Message.Header>
                    <p>There are no posts currently with your search criteria, why not create one?</p>
                </Message>
        )
    }
}
