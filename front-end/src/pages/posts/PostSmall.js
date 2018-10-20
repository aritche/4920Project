import React, { Component } from 'react';
import { Grid, Icon, Rating, Container, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from "moment";

export default class PostSmall extends Component {
    render() {
        const { post } = this.props;

        return (
            <Container key={ post.id } as={Link} to={"/posts/" + post.id} style={{borderRadius: '10px', backgroundColor: '#fbfbfb', border: '1.25px solid black', color:'black', padding: '14px', width: '350px'}}>
                <Grid columns={1} align='middle'>
                    <Container style={{borderTopRightRadius:'9px', borderTopLeftRadius: '9px', backgroundColor: '#193446', paddingTop: '10px', paddingBottom: '10px'}}>
                        <Header as='h3' style={{color: 'white'}}>
                        <Grid.Row>
                            {post.from_suburb}
                            <Icon name='angle right' style={{paddingLeft: '10px'}}/>
                            {post.to_suburb}
                        </Grid.Row>
                        </Header>
                    </Container>

                    <Container style={{paddingTop: '10px', paddingBottom: '10px'}}>
                        <Grid.Row style={{paddingBottom: '10px'}}>
                            {moment(post.closing_datetime).calendar()}
                        </Grid.Row>

                        <Grid.Row style={{paddingBottom: '10px'}}>
                            ${ post.budget }
                        </Grid.Row>
                    </Container>
                </Grid>
            </Container>
        )
    }
}
