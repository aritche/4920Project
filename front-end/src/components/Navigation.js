// modules/NavLink.js
import React from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/**
 * Probably Will Remove this later when optimising UI
 */

const Navigation = () => {
    return(
        <Navbar inverse>
            <Nav>
                <LinkContainer to="/"><NavItem>Home</NavItem></LinkContainer>
                <LinkContainer to="/details"><NavItem>Details</NavItem></LinkContainer>
                <LinkContainer to="/discussion"><NavItem>Discussion</NavItem></LinkContainer>
                <LinkContainer to="/host"><NavItem>Host</NavItem></LinkContainer>
                <LinkContainer to="/profile"><NavItem>Profile</NavItem></LinkContainer>
            </Nav>
            <Nav pullRight>
                {/* <NavItem><Login></Login></NavItem> */}
                <LinkContainer to="/login"><NavItem>Login</NavItem></LinkContainer>
                <LinkContainer to="/signup"><NavItem>Sign Up</NavItem></LinkContainer>
            </Nav>
        </Navbar>
    );
};

export default Navigation;