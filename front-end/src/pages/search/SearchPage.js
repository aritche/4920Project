import React, { Component } from 'react';
import CreateSearchPage from './CreateSearchPage';
import { Container } from 'semantic-ui-react';

export default class SearchPage extends Component {
    render() {
        return (
            <Container>
                <CreateSearchPage />
            </Container>
        )
    }
}
