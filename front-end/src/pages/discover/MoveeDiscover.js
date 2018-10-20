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
        };
    }

    componentDidMount() {
      fetch(url + 'recommended-removalists').then(response => {
        if (response.status === 200) {
          response.json().then(obj => {
            this.setState({
                removalists: obj
            });
          });
        } else {
          this.setState({
            errorMessage: 'Sorry, there was a problem. Please refresh.',
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
                        <AccountList accounts={this.state.removalists}/>
                    </Segment>
            </Segment>
        )
    }
}
