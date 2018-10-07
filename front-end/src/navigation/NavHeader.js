import React, { Component } from 'react';
import { Menu, Container, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { isLoggedIn, getLoggedInUser, logout } from '../Authentication';
import logo from './uMove_clear.png';
import { url } from '../Api';


export default class NavHeader extends Component {
    constructor(){
        super();

        this.state = {
            query: '',
            isLoggedIn: false
        }
    };

    getUserName() {
        if (isLoggedIn()) {
            fetch(url + 'user/' + getLoggedInUser()).then(response => {
                if (response.status === 200) {
                response.json().then(obj => {
                    this.setState({
                    userName: obj.first_name + ' ' + obj.last_name,
                    isLoggedIn: true
                    })
                });
                }
            });
        } else {
            this.setState({
                isLoggedIn: false
            })
        }
    };

    onQueryChange = (e) => {
        this.setState({ query: e.target.value });
    };

    onQuerySubmit = () => {
        console.log('Submitting:', this.state.query);

        alert("Searched for:  " + this.state.query);
        // Code to change to search page here
        //this.props.history.push('/')

    };

    render() {
        if (isLoggedIn() !== this.state.isLoggedIn) {
            this.getUserName();
        }
        return (
            <Menu inverted pointing secondary style={{backgroundColor: '#193446'}}>
              <Container>
                <Menu.Item
                    as={Link}
                    to={'/home'}
                    active={window.location.pathname === '/home'}>
                    <Image src={logo} style={{height:20}}/>
                </Menu.Item>

              <Menu.Item  as={Link} to={'/otherAccount'} active={window.location.pathname === '/otherAccount'}>
                <text> Other Profile </text>
              </Menu.Item>

              <Menu.Item  as={Link} to={'/account'} active={window.location.pathname === '/account'}>
                <text> Account </text>
              </Menu.Item>

              <Menu.Item  as={Link} to={'/posts'} active={window.location.pathname === '/posts'}>
                <text> Posts </text>
              </Menu.Item>

                {
                    this.state.isLoggedIn ?
                        <Menu.Menu position='right'>
                            <Menu.Item
                                as={Link}
                                to={'/account'}
                                active={window.location.pathname === '/account'}>
                                {'userName' in this.state ? this.state.userName : 'Account'}
                            </Menu.Item>
                            <Menu.Item
                                onClick={logout}
                                as={Link}
                                to={'/login'}
                                active={window.location.pathname === '/login'}>
                                Log Out
                            </Menu.Item>
                        </Menu.Menu>
                    :
                        <Menu.Menu position='right'>
                            <Menu.Item
                                as={Link}
                                to={'/login'}
                                active={window.location.pathname === '/login'}>
                                Log In
                            </Menu.Item>
                            <Menu.Item
                                as={Link}
                                to={'/signup'}
                                active={window.location.pathname === '/signup'}>
                                Sign Up
                            </Menu.Item>
                        </Menu.Menu>
                }
              </Container>
            </Menu>

        )
    };
}
