import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NavHeader extends Component {
    render() {
        return (
            <Segment inverted>
                <Menu inverted pointing secondary>
                    <Menu.Item as={Link} to={'/'} active={window.location.pathname === '/'}>
                        Home
                    </Menu.Item>
                    <Menu.Item as={Link} to={'/posts'} active={window.location.pathname === '/posts'}>
                        Posts
                    </Menu.Item>
                </Menu>
            </Segment>
        )
    }
}