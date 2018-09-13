import React, { Component } from 'react';
import { Menu, Segment, Input, Grid, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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


    onFormSubmit = () => {
        console.log('Submitting:', this.state.query);

    }

    render() {
        return (
            <Segment attached inverted style={{paddingTop:'0px', paddingBottom:'0px', marginBottom:'30px'}}>
                <Menu inverted pointing secondary>
                    <Menu.Item>
                        uMove
                    </Menu.Item>
                    <Menu.Item as={Link} to={'/'} active={window.location.pathname === '/'}>
                        Home
                    </Menu.Item>
                    <Menu.Item as={Link} to={'/posts'} active={window.location.pathname === '/posts'}>
                        Posts
                    </Menu.Item>

                    <Menu.Item style={{paddingTop: 2, paddingBottom:2}} position='right'>
                        <Form onSubmit={this.onFormSubmit}>
                            <Form.Input icon='search' style={{minWidth: 400}} placeholder='Search posts' value={this.state.query} onChange={this.onQueryChange}/>
                        </Form>
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
