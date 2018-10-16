import React, { Component } from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';
import PostList from '../posts/PostList';
import PostSmall from '../posts/PostSmall';
import PostListSmall from '../posts/PostListSmall';
import { url } from '../../Api';

export default class RecentMoves extends Component {
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
            <Segment attached secondary style={{borderRadius: '0px', backgroundColor:'white'}}>
                <Header align='middle' as='h1' style={{paddingBottom: '0px'}}>Recent Moves</Header>
                <Container text align='middle' style={{paddingBottom: '25px', width: '70%'}}>
                    <strong>Moves are happening all the time. <br/>Wondering what a post looks like? Click one of the following and have a peak!</strong>
                </Container>
                <PostListSmall posts={this.state.posts} />
            </Segment>
        )
    }
}
