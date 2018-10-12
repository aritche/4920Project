import React, { Component } from 'react';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
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
            <Segment attached secondary style={{borderRadius: '4px'}}>
                <Header size='huge' block style={{backgroundColor: '#193446', color:'white'}}>How it works</Header>

                <Grid textAlign='center' columns={4}>
                    <Grid.Row verticalAlign='middle'>
                        <ProcessStep/>
                    </Grid.Row>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                          <Image src='/images/post.jpg' size='medium' />
                        </Grid.Column>
                        <Grid.Column>
                          <strong>Movees who need things to be moved post jobs with a budget!</strong>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                          <Image src='/images/handshake.jpg' size='medium' />
                        </Grid.Column>
                        <Grid.Column>
                          <strong>Removalists offer their services at a price</strong>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                          <Image src='/images/moving box.jpg' size='medium' />
                        </Grid.Column>
                        <Grid.Column>
                          <strong>Movees accept an offer and removalists get the job done!</strong>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Segment>
        )
    }
}
