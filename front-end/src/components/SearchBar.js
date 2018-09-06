import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';

import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super();
        this.state = { searchText: props.initialSearch };

        this.setSearchText = this.setSearchText.bind(this);
        this.performSearch = this.performSearch.bind(this);
    }

    setSearchText(event) {
        this.setState({ searchText: event.target.value });
    };

    performSearch(event) {
        this.props.history.push({
            pathname: '/search',
            state: { searchValue: this.state.searchText }
        });
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.performSearch(event);
        };
    };

    render() {
        return (
            <div className="searchBar">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="Enter Address/Keyword"
                    maxLength={50}
                    value={this.state.searchText}
                    onChange={this.setSearchText}
                    onKeyPress={this.handleKeyPress}
                />
                <button className="searchButton" type="button" onClick={this.performSearch}>Search</button>
            </div>
        );
    };
};

export default withRouter(SearchBar);