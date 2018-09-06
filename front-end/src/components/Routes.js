import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Root from './Root';
import DetailsPage from '../pages/DetailsPage';
import DiscussionPage from '../pages/DiscussionPage';
import HomePage from '../pages/HomePage';
import HostPage from '../pages/HostPage';
import ProfilePage from '../pages/ProfilePage';
import SearchPage from '../pages/SearchPage';
import LoginPage from "./LoginForm";
import SignupPage from "./SignupForm";

class Routes extends Component {
    render() {
        return(
            <BrowserRouter>
                <div>
                    <Root>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/details" component={DetailsPage}/>
                        <Route path="/discussion" component={DiscussionPage}/>
                        <Route path="/host" component={HostPage}/>
                        <Route path="/profile" component={ProfilePage}/>
                        <Route path="/search" component={SearchPage}/>
                        <Route path="/login" exact component={LoginPage} />
                        <Route path="/signup" exact component={SignupPage} />
                    </Root>
                </div>
            </BrowserRouter>
        );
    };
};

export default Routes;