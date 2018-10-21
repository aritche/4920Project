import React, {Component} from 'react';
import {Grid, Header, Item, Rating} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class Account extends Component {
  render() {
    const {account} = this.props;

    return (
      <Grid textAlign='left' as={Link} columns={2} to={"/profile/" + account.id}
            style={{width: '250px', height: '150px', margin: '30px 0'}}>
        <Grid.Column width={9} style={{display: 'flex', padding: '0'}}>
          <Item.Image circular size='medium' src={'/images/avatar/' + account.avatar + '.jpg'}/>
        </Grid.Column>

        <Grid.Column width={7} verticalAlign='middle' style={{padding: '0', paddingLeft: '10px'}}>
          <div style={{paddingBottom: '5px'}}>
            <Header as='h4'> {account.first_name}
              {' '}
              {account.last_name}</Header>
          </div>

          <div style={{paddingBottom: '2px'}}>
            <Rating maxRating={5} defaultRating={5} disabled icon='star'/>
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}
