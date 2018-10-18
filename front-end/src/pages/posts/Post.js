import React, { Component } from 'react';
import { Item, Grid, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from "moment";

import './Post.css';

export default class Post extends Component {
    render() {
        const { post } = this.props;

        return (
            <Item key={ post.id } as={Link} to={"/posts/" + post.id}>
                <div style={{display: 'flex', paddingRight: '20px'}}>
                    <Item.Image circular size='tiny' src={'/images/avatar/' + post.movee.avatar + '.jpg'} />
                </div>
                <Item.Content>
                    <Item.Header>{post.title}
                        <Label color={post.status === 'ACCEPTED' ? 'green' : post.status === 'CLOSED' ? 'red' : 'blue'} style={{marginLeft: '20px'}}>
                            { post.status }
                        </Label>
                    </Item.Header>
                    <Item.Meta>{post.movee.first_name + ' ' + post.movee.last_name} [stars here]</Item.Meta>
                    <Item.Description>
                        <Grid>
                            <Grid.Column width={3} >
                                From { post.from_suburb }<br/>
                                To { post.to_suburb }
                            </Grid.Column>
                            <Grid.Column width={1} >
                                ${ post.budget }
                            </Grid.Column>
                            <Grid.Column width={2} >
                                { post.distance_string }
                            </Grid.Column>
                            <Grid.Column width={7} >
                                <div className="post-description">
                                    <em>"{ post.description }"</em>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={3} >
                                { post.date_string }
                            </Grid.Column>
                        </Grid>
                    </Item.Description>
                </Item.Content>
            </Item>
        )
    }
}
