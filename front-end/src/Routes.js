import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PostsPage from './pages/posts/PostsPage';
import CreatePostPage from './pages/posts/CreatePostPage';
import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SignupPage';
import PostDetailsPage from './pages/posts/PostDetailsPage';
import SearchPage from './pages/search/SearchPage';
import Account from "./pages/account/Account";
import Profile from "./pages/account/AccountProfile";

export default class Routes extends Component {
    render() {
        return (
            <Switch>
              <Route exact path='/' component={PostsPage}/>
              <Route path='/posts/:postId' component={PostDetailsPage}/>
              <Route path='/posts' component={PostsPage}/>
              <Route path='/create-post' component={CreatePostPage}/>
              <Route path='/login' component={LoginPage}/>
              <Route path='/signup' component={SignupPage}/>
              <Route path='/search' component={SearchPage}/>
              <Route path={'/account'} component={Account}/>
              <Route path={'/profile'} component={Profile}/>
            </Switch>
        )
    }
}
