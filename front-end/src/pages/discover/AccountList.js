import React, { Component } from 'react';
import { Container, Segment, Header, Divider, Grid, Message} from 'semantic-ui-react';
import Account from './Account';

export default class AccountList extends Component {
    render() {
        return (
            this.props.accounts && this.props.accounts.length > 0 ?
                <div align='center' className="list-container">

                    <Grid link columns={3} style={{width: '100%'}}>
                        <Grid.Row style={{marginBottom: '40px'}}>
                        {
                            this.props.accounts.map(account => <Grid.Column><Account key={account.id} account={account} /></Grid.Column>)
                        }
                        </Grid.Row>
                    </Grid>
                </div>
            :
            <Message>
                <Message.Header>No posts to view</Message.Header>
                <p>We're working hard to connect you with great removalists. Come back later.</p>
            </Message>
        )
    }
}
