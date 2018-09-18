import React, { Component } from 'react';
import PostList from './PostList';
import { Button, Container, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
    render() {
        return (
            <Container>
                <Header as='h2'>
                    <Icon name='file alternate' />
                    <Header.Content>Posts</Header.Content>
                </Header>
                <Button as={Link} to={'/create-post'} positive>Create Post</Button>
                <PostList posts={posts} />
            </Container>
        )
    }
}