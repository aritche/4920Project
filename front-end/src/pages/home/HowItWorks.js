import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Header, Grid, Image } from 'semantic-ui-react';
import PostList from '../posts/PostList';
import { url } from '../../Api';

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
                <Header huge>How it works</Header>
                <Grid textAlign='center' columns={3}>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' />
                        </Grid.Column>
                        <Grid.Column>
                        Movees who need things to be moved post jobs with a budget!
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' />
                        </Grid.Column>
                        <Grid.Column>
                        Removalists offer their services at a price
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' />
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
