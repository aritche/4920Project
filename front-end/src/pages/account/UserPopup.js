import {Button, Divider, Grid, Header, Image, Segment} from "semantic-ui-react";
import React, {Component} from "react";
import {logout} from "../../Authentication";
import {Link} from "react-router-dom";
import {Menu} from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";

export default class UserPopup extends Component {
  render() {
    return (
      <div>
        <Grid centered>
          <Grid.Row>
            <Segment circular size={'tiny'}
                     style={{paddingBottom: 1, paddingRight: 1, paddingTop: 1, paddingLeft: 1,
                       backgroundColor: 'white', marginTop: '1%'}}>
              <Image src={'/images/avatar/' + 'male1' + '.jpg'} circular size={'tiny'} bordered/>
            </Segment>

          </Grid.Row>
          <Grid.Row>
            <Header content={'Frank Wang'}/>
          </Grid.Row>
          <Divider/>
          <Grid.Row>
          <div style={{display: 'flex'}}>
            <Button
              style={{backgroundColor: '#193446', color: 'white', width: 100, height: 38}}
              as={Link}
              to={'/account'}
              active={window.location.pathname === '/account'}>
              {'userName' in this.state ? this.state.userName : 'Account'}
              >Dashboard</Button>
            <Button style={{backgroundColor: '#22AABB', color: 'white', width: 100, height: 38}}
                    onClick={logout}
                    as={Link}
                    to={'/login'}
                    active={window.location.pathname === '/login'}>
              Log out
            </Button>
          </div>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
