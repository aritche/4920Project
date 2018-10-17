import React, { Component } from 'react';
import PostList from './PostList';
import { Pagination, Divider, Grid } from 'semantic-ui-react';

export default class PaginatedPostList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postsToDisplay: [],
            activePage: this.props.defaultActivePage ? this.props.defaultActivePage : 1
        };
    }

    componentDidMount() {
        this.updateDisplayedPosts();
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ activePage: activePage }, this.updateDisplayedPosts);
    }

    updateDisplayedPosts = () => {
        var start = (this.state.activePage - 1) * this.props.postsPerPage;
        var end = this.state.activePage * this.props.postsPerPage;
        end = end > this.props.posts.length ? this.props.posts.length : end;

        this.setState({ postsToDisplay: this.props.posts.slice(start, end) });
    }

    render() {
        return (
            <div>
                <PostList posts={this.state.postsToDisplay} />
                <Grid textAlign='center' style={{marginTop: '5px'}}> 
                    <Divider style={{width: '30%', marginBottom: '5px'}}/>
                </Grid>
                <div className="pagination-container">
                    <Pagination defaultActivePage={this.props.defaultActivePage ? this.props.defaultActivePage : 1} 
                        totalPages={Math.ceil(this.props.posts.length/this.props.postsPerPage)} 
                        onPageChange={this.handlePaginationChange}
                    />
                </div>
            </div>
        )
    }
}
