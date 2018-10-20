import React, { Component } from 'react';
import { Segment, Container, Item, Grid, Label, Rating, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class DiscoverPost extends Component {
    render() {
        const { post } = this.props;

        return (
            <Item key={ post.id } as={Link} to={"/posts/" + post.id} style={{width: '300px'}}>
                <Item.Content>
                    <Grid cols={2} style={{margin: '0px'}}>
                        <Grid.Row style={{padding: '0', paddingBottom: '10px'}}>
                            <Header as='h3'>{post.title}</Header>
                        </Grid.Row>
                        <Grid.Row style={{padding: '0'}}>
                            <Grid.Column textAlign='center' width={6} style={{padding: '0'}}>
                                <Grid.Row>
                                    <Item.Image circular size='tiny' src={'/images/avatar/' + post.movee.avatar + '.jpg'} />
                                </Grid.Row>
                                <Grid.Row>
                                    {post.movee.first_name + ' ' + post.movee.last_name}
                                    {post.movee.rating_overall !== undefined && post.movee.rating_overall !== 0 &&
                                        <Rating size={'medium'} icon='star' style={{marginLeft: '10px'}} defaultRating={post.movee.rating_overall} maxRating={5} disabled/>
                                    }
                                </Grid.Row>
                            </Grid.Column>

                            <Grid.Column width={10} style={{}}>
                                <Grid.Row style={{paddingBottom: '5px'}}>
                                    <Container style={{color: 'black'}}>{ post.from_suburb + ' to ' + post.to_suburb}</Container>
                                </Grid.Row>
                                <Grid.Row style={{paddingBottom: '5px'}}>
                                    <Container style={{color: 'black'}}>{ '('+ post.distance_string + ')'}</Container>
                                </Grid.Row>
                                <Grid.Row style={{paddingBottom: '5px'}}>
                                    <Label color='green' tag>${ post.budget }</Label>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Item.Content>
            </Item>
        )
    }
}
