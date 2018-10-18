import React, { Component } from 'react';
import { Item, Grid, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from "moment";

export default class Account extends Component {
    render() {
        const { account } = this.props;

        return (
            <Item key={ account.id } as={Link} to={"/accounts/" + account.id}>
                <div style={{display: 'flex', paddingRight: '20px'}}>
                    <Item.Image circular size='tiny' src={'/images/avatar/' + account.movee.avatar + '.jpg'} />
                </div>
                <Item.Content>
                    <Item.Header>{account.title}
                        <Label color={account.status === 'ACCEPTED' ? 'green' : account.status === 'CLOSED' ? 'red' : 'blue'} style={{marginLeft: '20px'}}>
                            { account.status }
                        </Label>
                    </Item.Header>
                    <Item.Meta>{account.movee.first_name + ' ' + account.movee.last_name} [stars here]</Item.Meta>
                    <Item.Description>
                        <Grid>
                            <Grid.Column width={3} >
                                From { account.from_suburb }<br/>
                                To { account.to_suburb }
                            </Grid.Column>
                            <Grid.Column width={1} >
                                ${ account.budget }
                            </Grid.Column>
                            <Grid.Column width={2} >
                                { account.distance_string }
                            </Grid.Column>
                            <Grid.Column width={7} >
                                <div style={{maxHeight: '90px', overflow: 'hidden', textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'}}>
                                    <em>"{ account.description }"</em>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={3} >
                                { account.date_string }
                            </Grid.Column>
                        </Grid>
                    </Item.Description>
                </Item.Content>
            </Item>
        )
    }
}
