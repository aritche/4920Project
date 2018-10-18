import {Button} from "semantic-ui-react";
import React, {Component} from "react";
import {logout} from "../../Authentication";
import {Link} from "react-router-dom";

export default class UserPopup extends Component {
  render() {
    return (
      <div>
        <Button
          style={{backgroundColor: '#193446', color: 'white', width: 100, height: 38}}
          as={Link}
          to={'/account'}
          active={window.location.pathname === '/account'}
        >
          Dashboard
        </Button>
        <Button style={{backgroundColor: '#22AABB', color: 'white', width: 100, height: 38}}
                onClick={logout}
                as={Link}
                to={'/login'}
                active={window.location.pathname === '/login'}>
          Log out
        </Button>
      </div>
    )
  }
}
