import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import PostsPage from './pages/posts/PostsPage';
import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SignupPage';

export default class Routes extends Component {
    render() {
        return (
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route path='/posts' component={PostsPage}/>
              <Route path='/login' component={LoginPage}/>
              <Route path='/signup' component={SignupPage}/>
            </Switch>
        )
    }
}
