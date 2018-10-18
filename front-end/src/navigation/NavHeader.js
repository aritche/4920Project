import React, { Component } from 'react';
import {Menu, Container, Image, Popup} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { isLoggedIn, getLoggedInUser, getLoggedInUserType } from '../Authentication';
import { url } from '../Api';
import { userType } from '../constants';
import UserPopup from '../pages/account/UserPopup'

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
        const homeUrl = isLoggedIn() ? '/discover' : '/home';
        if (isLoggedIn() !== this.state.isLoggedIn) {
            this.getUserName();
        }
        return (
            <Menu inverted pointing secondary style={{backgroundColor: '#193446', boxShadow: '2px 1px 2px #000000', maxHeight: '45px'}}>
              <Container>
                <Menu.Item
                    as={Link}
                    to={homeUrl}
                    active={isLoggedIn() ? false : window.location.pathname === homeUrl}>
                    <Image src={'/images/logo.png'} style={{height:20}}/>
                </Menu.Item>
                {
                    /*
                  <Menu.Item
                    as={Link}
                    to={'/account' }
                    active={isLoggedIn() ? false : window.location.pathname === '/account' }>
                    account
                  </Menu.Item>
                  */
                }

                {
                    this.state.isLoggedIn && getLoggedInUserType() === userType.MOVEE &&
                    <Menu.Item as={Link} to={'/create-post'} active={window.location.pathname === '/create-post'}>
                        Create Post
                    </Menu.Item>
                }

              <Menu.Item  as={Link} to={'/posts'} active={window.location.pathname === '/posts'}>
                Browse Posts
              </Menu.Item>
                {
                    this.state.isLoggedIn ?
                      <Menu.Menu position='right'>
                        <Menu.Item>
                          <Popup
                            style={{boxShadow: '2px 3px 2px #000000'}}
                            trigger={<Image style={{width: "6%", height: '4%', marginBottom: '-1.5%',
                              marginLeft: '95%', cursor: 'pointer'}} src={'/images/avatar/' + 'male1' + '.jpg'}
                                            circular avatar/>}
                            content=
                              {
                                <UserPopup
                                  userName={this.state.userName}
                                />
                              }
                            on='click'
                          />
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
