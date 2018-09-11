import React, { Component } from 'react';
import { Menu, Segment, Search} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NavHeader extends Component {
    render() {
        return (
            <Segment attached inverted>
                <Menu inverted pointing secondary>
                    <Menu.Item as={Link} to={'/'} active={window.location.pathname === '/'}>
                        Home
                    </Menu.Item>
                    <Menu.Item as={Link} to={'/posts'} active={window.location.pathname === '/posts'}>
                        Posts
                    </Menu.Item>

                    <Menu.Item position='right'>
                        <Search
                           value='still working on this' 
                        />
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item as={Link} to={'/login'} active={window.location.pathname === '/login'}>
                            Log In
                        </Menu.Item>
                        <Menu.Item as={Link} to={'/signup'} active={window.location.pathname === '/signup'}>
                            Sign Up
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        )
    }
}
