import React, { Component } from 'react';
import CreatePostForm from './CreatePostForm';
import { Container } from 'semantic-ui-react';

export default class CreatePostPage extends Component {
    render() {
        return (
            <Container>
                <CreatePostForm history={this.props.history}/>
            </Container>
        )
    }
}