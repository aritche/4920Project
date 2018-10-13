import React, { Component } from 'react';
import { Item, Grid, Label, Icon, Rating} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Post.css';

export default class PostSmall extends Component {
    render() {
        const { post } = this.props;

        return (
            <Item key={ post.id } as={Link} to={"/posts/" + post.id}>
                <Item.Content>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Item.Header>
                                {post.address_from.city}
                                <Icon name='angle right'/>
                                {post.address_to.city}
                            </Item.Header>
                        </Grid.Row>

                        <Item.Description>
                            <Grid.Row>
                                ${ post.budget }
                            </Grid.Row>

                            <Grid.Row>
                                <Rating maxRating={5} defaultRating={5} disabled icon='star'/>
                            </Grid.Row>

                            <Grid.Row>
                                {post.closing_datetime1}
                            </Grid.Row>
                        </Item.Description>
                    </Grid>
                </Item.Content>
            </Item>
        )
    }
}
