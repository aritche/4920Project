
import React, { Component } from 'react';

import Navigation from './Navigation';

import './Root.css';

class Root extends Component {
    render() {
        return (
            <div className="main">
                <div className="nav">
                    <Navigation></Navigation>
                </div>
                <div className="page">
                    {this.props.children}
                </div>
            </div>
        );
    };
};

export default Root;