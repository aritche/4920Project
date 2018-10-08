import React, { Component } from 'react';
import { Segment, Container, Header, Grid, Image } from 'semantic-ui-react';
import { url } from '../../Api';
import ProcessStep from './ProcessStep'

export default class HowItWorks extends Component {
    constructor() {
        super();

        this.state = {
            posts: [],
        }
    };

    componentDidMount() {
        fetch(url + 'search-posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }).then(response => {
            if (response.status === 200) {
                response.json().then(obj => {
                    this.setState({
                        posts: obj.moves
                    });
                });
            } else {
                this.setState({
                    submitError: true,
                    errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                    isLoading: false
                });
            }
        });
    }

    render() {
        return (
            <Segment attached secondary>
                <Header huge block style={{backgroundColor: '#193446', color:'white'}}>How it works</Header>
                <Grid textAlign='center' columns={4}>
                    <Grid.Row verticalAlign='middle'>
                    <ProcessStep/>
                    </Grid.Row>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                          <Image src='/images/post.jpg' size='small' />
                        </Grid.Column>
                        <Grid.Column>
                          Movees who need things to be moved post jobs with a budget!
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                          <Image src='/images/handshake.jpg' size='small' />
                        </Grid.Column>
                        <Grid.Column>
                          Removalists offer their services at a price
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                          <Image src='/images/moving box.jpg' size='small' />
                        </Grid.Column>
                        <Grid.Column>
                          Movees accept an offer and removalists get the job done!
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}
