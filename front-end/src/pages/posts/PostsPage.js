import React, { Component } from 'react';
import PostList from './PostList';
import FilterBar from './FilterBar';
import { Container, Segment } from 'semantic-ui-react';
import { url } from '../../Api';

export default class PostsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            postcode: '',
            lowerBudget: '',
            upperBudget: '',
            lowerDate: '',
            upperDate: ''
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

    handleFilterChange(filter, value) {
        this.setState({ [filter]: value }, () => {
            this.reloadPosts();
        });
    }

    reloadPosts() {
        fetch(url + 'search-posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'postcode': this.state.postcode,
                'lowerBudget': this.state.lowerBudget,
                'upperBudget': this.state.upperBudget,
                'lowerDate': this.state.lowerDate,
                'upperDate': this.state.upperDate
            })
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
            <Container style={{minHeight: '96vh'}}>
                <Segment.Group style={{boxShadow: '2px 1px 2px #000000'}}>
                    <FilterBar
                        handleChange={this.handleFilterChange.bind(this)}
                    />
                    <Segment secondary>
                        <PostList posts={this.state.posts} />
                    </Segment>
                </Segment.Group>
            </Container>
        )
    }
}
