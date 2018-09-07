import React, { Component } from 'react';
import CreatePostForm from './CreatePostForm';
import { Container } from 'semantic-ui-react';

export default class PostsPage extends Component {
    render() {
        return (
            <Container>
                <CreatePostForm />
            </Container>
        )
    }
}