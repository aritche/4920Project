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
                    <Item.Meta>{post.movee.first_name + ' ' + post.movee.last_name}</Item.Meta>
                    <Item.Description>
                        <Grid>
                            <Grid.Column width={3} >
                                From { post.address_from.city }<br/>
                                To { post.address_to.city }
                            </Grid.Column>
                            <Grid.Column width={2} >
                                ${ post.budget }
                            </Grid.Column>
                            <Grid.Column width={5} >
                                <div className="post-description">
                                    "{ post.description }"
                                </div>
                            </Grid.Column>
                            <Grid.Column width={3} >
                                [Stars go here]
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
