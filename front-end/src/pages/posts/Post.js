import React, { Component } from 'react';
import { Item, Image, Grid } from 'semantic-ui-react';
import './Post.css';

export default class Post extends Component {
    render() {
        const { post } = this.props;
        
        return (
            <Item>
                <Item.Image size='tiny' src='/images/default_profile_pic.jpg' />

                <Item.Content>
                    <Item.Header as='a'>{post.title}</Item.Header>
                    <Item.Meta>{post.user}</Item.Meta>
                    <Item.Description>
                        <Grid>
                            <Grid.Column width={4} >
                                From { post.addressFrom }<br/>
                                To { post.addressTo }
                            </Grid.Column>
                            <Grid.Column width={2} >
                                { post.budget }
                            </Grid.Column>
                            <Grid.Column width={6} >
                                <div className="post-description">
                                    { post.description }
                                </div>
                            </Grid.Column>
                        </Grid>
                    </Item.Description>
                </Item.Content>
            </Item>
        )
    }
}