import React, { Component } from 'react';

import SearchBar from '../components/SearchBar';

class HomePage extends Component {
    render() {
        return (
            <div className="HomePage">
                <h1 className="Title">ULive</h1>
                <h3 className="Slogan">Bringing Cultures Together</h3>
                <div className="searchBarContainerHome">
                    <SearchBar initialSearch=''></SearchBar>
                </div>
            </div>
        );
    };
};

export default HomePage;