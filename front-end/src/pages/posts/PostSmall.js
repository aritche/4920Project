import React, { Component } from 'react';
import { Item, Grid, Label, Icon, Rating, Container, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Post.css';

export default class PostSmall extends Component {
    render() {
        const { post } = this.props;

        return (
            <Container key={ post.id } as={Link} to={"/posts/" + post.id} style={{borderRadius: '10px', backgroundColor: '#fbfbfb', border: '1.25px solid black', color:'black', padding: '14px', width: '250px'}}>
                <Grid columns={1} align='middle'>
                    <Container style={{borderTopRightRadius:'9px', borderTopLeftRadius: '9px', backgroundColor: '#193446', paddingTop: '10px', paddingBottom: '10px'}}>
                        <Header as='h3' style={{color: 'white'}}>
                        <Grid.Row>
                            {post.address_from.city}
                            <Icon name='angle right' style={{paddingLeft: '10px'}}/>
                            {post.address_to.city}
                        </Grid.Row>
                        </Header>
                    </Container>

                    <Container style={{paddingTop: '10px', paddingBottom: '10px'}}>
                        <Grid.Row style={{paddingBottom: '10px'}}>
                            {post.closing_datetime1}
                        </Grid.Row>

                        <Grid.Row style={{paddingBottom: '10px'}}>
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
