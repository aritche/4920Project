import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import PostsPage from './pages/posts/PostsPage';
import CreatePostPage from './pages/posts/CreatePostPage';
import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SignupPage';
import PostDetailsPage from './pages/posts/PostDetailsPage';
import SearchPage from './pages/search/SearchPage';
import AccountDashboard from "./pages/account/AccountDashboard";

export default class Routes extends Component {
    render() {
        return (
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route path='/posts/:postId' component={PostDetailsPage}/>
              <Route path='/posts' component={PostsPage}/>
              <Route path='/create-post' component={CreatePostPage}/>
              <Route path='/login' component={LoginPage}/>
              <Route path='/signup' component={SignupPage}/>
              <Route path='/search' component={SearchPage}/>
              <Route path={'/acctDash'} component={AccountDashboard}/>
            </Switch>
        )
    }
}
