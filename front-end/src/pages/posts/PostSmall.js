import React, { Component } from 'react';
import { Item, Grid, Label, Icon, Rating, Container, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Post.css';

export default class PostSmall extends Component {
    render() {
        const { post } = this.props;

        return (
            <Container key={ post.id } as={Link} to={"/posts/" + post.id} style={{borderRadius: '20px', backgroundColor: '#fbfbfb', border: '2px solid black', color:'black', padding: '20px', width: '200px'}}>
                <Grid columns={1} align='middle'>
                    <Container>
                        <Header as='h3'>
                        <Grid.Row>
                            {post.address_from.city}
                            <Icon name='angle right'/>
                            {post.address_to.city}
                        </Grid.Row>
                        </Header>
                    </Container>

                    <Container>
                        <Grid.Row>
                            {post.closing_datetime1}
                        </Grid.Row>

                        <Grid.Row>
                            ${ post.budget }
                        </Grid.Row>

                        <Grid.Row>
                            <Rating maxRating={5} defaultRating={5} disabled icon='star'/>
                        </Grid.Row>
                    </Container>
                </Grid>
            </Container>
        )
    }
}
