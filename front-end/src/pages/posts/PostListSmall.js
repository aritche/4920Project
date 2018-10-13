import React, { Component } from 'react';
import PostSmall from './PostSmall';
import { Item, Message, Grid } from 'semantic-ui-react';

export default class PostListSmall extends Component {
    render() {
        return (
            this.props.posts && this.props.posts.length > 0 ?
                <div className="list-container">
                
                    <Grid link columns={this.props.posts.length}>
                        {
                            this.props.posts.map(post => <Grid.Column><PostSmall key={post.id} post={post} /></Grid.Column>)
                        }
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