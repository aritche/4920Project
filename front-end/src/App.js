import React, { Component } from 'react';
import './App.css';
import NavHeader from './navigation/NavHeader';
import MainFooter from './navigation/MainFooter';
import Routes from './Routes';

class App extends Component {
    render() {
        return (
            <div className="main" style={{backgroundImage: 'url(/images/forest2.jpg)'}}>
                <NavHeader />
              <br/>
              <br/>
                <Routes/>
                <MainFooter/>
            </div>
        );
    }
}

export default App;
