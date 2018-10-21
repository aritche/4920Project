import React, {Component} from 'react';
import {Grid, Header, Icon} from 'semantic-ui-react';

export default class ProcessStep extends Component {
  render() {
    return (
      <Grid columns={4} style={{marginLeft: '40px', marginRight: '40px'}}>
        <Grid.Row>
          <Grid.Column>
            <Icon name='file alternate' size='huge' color='blue'/>
          </Grid.Column>
          <Grid.Column>
            <Icon name='handshake' size='huge' color='yellow'/>
          </Grid.Column>
          <Grid.Column>
            <Icon name='truck' size='huge' color='orange'/>
          </Grid.Column>
          <Grid.Column>
            <Icon name='thumbs up' size='huge' color='green'/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{paddingBottom: 0, paddingTop: 0}}>
          <Grid.Column>
            <Header as='h3'>Post</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3'>Accept</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3'>Move</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h3'>Review</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{paddingTop: 0}}>
          <Grid.Column>
            Movees post about what they need moved.
          </Grid.Column>
          <Grid.Column>
            Removalists describe and offer their services.
          </Grid.Column>
          <Grid.Column>
            When both parties are satisfied, the move happens.
          </Grid.Column>
          <Grid.Column>
            Finish the exchange by leaving a review!
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
