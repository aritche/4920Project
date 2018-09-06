import React, { Component } from 'react';

import SearchBar from '../components/SearchBar';

import FilterSort from '../components/FilterSort';
import CollegeDetailsShort from '../components/CollegeDetailsShort';
import './SearchPage.css'

import url from '../api';

class SearchPage extends Component {
    constructor(props) {
        super();
        console.log("hello");
        this.state = {
            searchText: props.location.state.searchValue,
            isLoading: true
        };
    };

    setText(e) {
        this.setState({ searchText: e.target.value });
    };

    componentDidMount() {
        this.setState({isLoading: true})
        fetch(url + 'accommodations').then(response => {
            return response.json();
        }).then(json => {
            this.setState({
                accommodations: json,
                isLoading: false
            })
        });

    }

    performSearch() {
        console.log("YOU FOUND ME, YOU FOUND ME...");
    };

    render() {
        /**
         * TODO
         * Get List of Accommodations
         * Print out List of Accommodations (2xN structure, big pictures)
         */
        // colleges = [college, college, college];

        let accommodationsList = null;
        if (!this.state.isLoading) {
            accommodationsList = this.state.accommodations.map((accommodation, i) =>
                <CollegeDetailsShort className="collegeShort" college={accommodation} key={i}></CollegeDetailsShort>
            );
        }

        return (
            <div className="SearchPage">
                <div className="searchBarContainerSearch">
                    <SearchBar initialSearch={this.state.searchText}></SearchBar>
                </div>
                <FilterSort></FilterSort>
                <hr></hr>
                <div className="colleges">
                    {!this.state.isLoading ? accommodationsList: <div>Loading...</div>}
                </div>

            </div>
        );
    };
};

export default SearchPage;