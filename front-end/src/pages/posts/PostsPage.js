import React, { Component } from 'react';
import PostList from './PostList';
import { Button, Container, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { url } from '../../Api';

// TODO: Get from backend
// We'll use mock posts here for now
const posts = [
    {
        id: 1,
        user: "John Smith",
        title: "Test post 1",
        date: "10/09/18",
        budget: "$1000",
        addressTo: "Suburb 1",
        addressFrom: "Suburb 2",
        description: `Lorem Ipsum is simply dummy text of
        the printing and typesetting
        industry. Lorem Ipsum has been
        the industry's standard dummy text
        ever since the 1500s, when an unknown
        printer took a galley of type and scrambled
        it to make a type specimen book
        `
    },
    {
        id: 2,
        user: "Santa Claus",
        title: "Christmas Move",
        date: "25/12/18",
        budget: "$9999",
        addressTo: "North Pole",
        addressFrom: "South Pole",
        description: "Reindeers on holidays, need help :("
    }
]

export default class PostsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

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
                    })
                    return;
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
            <Container>
                <Header as='h2'>
                    <Icon name='file alternate' />
                    <Header.Content>Posts</Header.Content>
                </Header>
                <Button as={Link} to={'/create-post'} positive>Create Post</Button>
                <PostList posts={this.state.posts} />
            </Container>
        )
    }
}