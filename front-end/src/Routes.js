import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import PostsPage from './pages/posts/PostsPage';

export default class Routes extends Component {
    render() {
        return (
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route path='/posts' component={PostsPage}/>
            </Switch>
        )
    }
}