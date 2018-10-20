import React, { Component } from 'react';
import DiscoverPost from './DiscoverPost';
import { Item, Message, Grid } from 'semantic-ui-react';

export default class RecommendedPostList extends Component {
    render() {
        return (
                this.props.posts && this.props.posts.length > 0 ?
                    <div className="list-container">
                        <Item.Group link>
                        <Grid>
                        {
                            this.props.posts.map(post => <Grid.Column style={{width: '300px'}}><DiscoverPost key={post.id} post={post} /></Grid.Column>)
                        }
                        </Grid>
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
