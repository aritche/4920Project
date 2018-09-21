import React, { Component } from 'react';
import { Item, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Post.css';

export default class Post extends Component {
    render() {
        const { post } = this.props;

        return (
            <Item key={ post.id } as={Link} to={"/posts/" + post.id}>
                <Item.Image size='tiny' src='/images/default_profile_pic.jpg' />

                <Item.Content>
                    <Item.Header>{post.title}</Item.Header>
                    <Item.Meta>{post.movee.first_name + ' ' + post.movee.last_name}</Item.Meta>
                    <Item.Description>
                        <Grid>
                            <Grid.Column width={4} >
                                From { post.address_from.city }<br/>
                                To { post.address_to.city }
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