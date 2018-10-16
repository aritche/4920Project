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
                        <Label color={post.status === 'ACCEPTED' ? 'green' : 'blue'} style={{marginLeft: '20px'}}>
                            { post.status }
                        </Label>
                    </Item.Header>
                    <Item.Meta>{post.movee.first_name + ' ' + post.movee.last_name} [stars here]</Item.Meta>
                    <Item.Description>
                        <Grid>
                            <Grid.Column width={3} >
                                From { post.address_from.city }<br/>
                                To { post.address_to.city }
                            </Grid.Column>
                            <Grid.Column width={1} >
                                ${ post.budget }
                            </Grid.Column>
                            <Grid.Column width={2} >
                                [Distance here]
                            </Grid.Column>
                            <Grid.Column width={7} >
                                <div className="post-description">
                                    <em>"{ post.description }"</em>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={3} >
                                {moment(post.closing_datetime1).format('D MMM YYYY') + ' at ' + moment(post.closing_datetime1).format('h A')}
                            </Grid.Column>
                        </Grid>
                    </Item.Description>
                </Item.Content>
            </Item>
        )
    }
}
