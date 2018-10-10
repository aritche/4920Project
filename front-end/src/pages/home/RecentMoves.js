import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PostList from '../posts/PostList';
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
            <Segment attached style={{borderRadius: '4px'}}>
                <Header size='huge' block style={{backgroundColor: '#193446', color:'white'}}>Recent Moves</Header>
                <PostList posts={this.state.posts} />
            </Segment>
        )
    }
}
