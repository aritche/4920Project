import React, { Component } from 'react';
import { Container, Segment, Header, Divider } from 'semantic-ui-react';
import AccountList from './AccountList';
import { url } from '../../Api';
import { getLoggedInUser, logout } from '../../Authentication';

export default class MoveeDiscover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            removalists: [],
            errorMessage: '',
            user: {
                avatar: 'default',
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                description: '',
                posts: [],
                reviews: [],
                post_records: [],
                joined_in: '',
                rating: {overall: 3},
                id: ''
            },
            user1: {
                avatar: 'default',
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                description: '',
                posts: [],
                reviews: [],
                post_records: [],
                joined_in: '',
                rating: {overall: 3},
                id: ''
            },
            user2: {
                avatar: 'default',
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                description: '',
                posts: [],
                reviews: [],
                post_records: [],
                joined_in: '',
                rating: {overall: 3},
                id: ''
            }
        };
    }

    componentDidMount() {
      fetch(url + 'user/1').then(response => {
        if (response.status === 200) {
          response.json().then(obj => {
            this.setState({
              user: obj,
              user1: obj,
              user2: obj
            })
          });
        } else {
          this.setState({
            errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
          });
        }
      });
    }

    render() {
        return (
            <Segment attached style={{backgroundColor: "white", borderRadius: '4px'}}>
                    <Header attached='top' size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}>
                    Recommended Removalists
                    </Header>
                    <Segment attached secondary>
                        <AccountList accounts={[this.state.user, this.state.user1, this.state.user2]}/>
                    </Segment>
            </Segment>
        )
    }
}
