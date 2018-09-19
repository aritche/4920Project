import React, { Component } from 'react';
import { Menu, Segment, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { isLoggedIn, getLoggedInUser, logout } from '../Authentication';

export default class NavHeader extends Component {
    constructor(){
        super();

        this.state = {
            query: ''
        }
    }

    onQueryChange = (e) => {
        this.setState({ query: e.target.value });
    }

    onQuerySubmit = () => {
        console.log('Submitting:', this.state.query);

        alert("Searched for:  " + this.state.query);
        // Code to change to search page here
        //this.props.history.push('/')

    }

    render() {
        return (
            <Segment attached inverted style={{paddingTop:'0px', paddingBottom:'0px', marginBottom:'30px'}}>
                <Menu inverted pointing secondary>
                    <Menu.Item>
                        uMove
                    </Menu.Item>
                    {/*
                    <Menu.Item as={Link} to={'/'} active={window.location.pathname === '/'}>
                        Home
                    </Menu.Item>
                    */}
                    <Menu.Item as={Link} to={'/posts'} active={window.location.pathname === '/posts'}>
                        Posts
                    </Menu.Item>
                    <Menu.Item as={Link} to={'/acctDash'} active={window.location.pathname === '/acctDash'}>
                        Dashboard
                    </Menu.Item>

                    
                    {
                        isLoggedIn() ?
                        <Menu.Menu position='right'>
                            <Menu.Item onClick={logout} as={Link} to={'/login'} active={window.location.pathname === '/login'}>
                                Log Out
                            </Menu.Item>
                        </Menu.Menu>
                        :
                        <Menu.Menu position='right'>
                            <Menu.Item as={Link} to={'/login'} active={window.location.pathname === '/login'}>
                                Log In
                            </Menu.Item>
                            <Menu.Item as={Link} to={'/signup'} active={window.location.pathname === '/signup'}>
                                Sign Up
                            </Menu.Item>
                        </Menu.Menu>
                    }
                   
                </Menu>
            </Segment>
        )
    }
}
