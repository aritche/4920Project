import {Button} from "semantic-ui-react";
import React, {Component} from "react";
import {logout} from "../../Authentication";
import {Link} from "react-router-dom";

export default class UserPopup extends Component {
  render() {
    return (
      <div>
        <Button.Group>
          <Button
            onClick={this.props.closePopup}
            style={{backgroundColor: '#193446', color: 'white', width: 110, height: 38}}
            as={Link}
            to={'/account'}
            active={window.location.pathname === '/account'}
          >
            Dashboard
          </Button>
          <Button.Or />
          <Button style={{backgroundColor: '#22AABB', color: 'white', width: 100, height: 38}}
                  onClick={() => {
                    this.props.closePopup();
                    logout();
                  }}
                  as={Link}
                  to={'/login'}
                  active={window.location.pathname === '/login'}>
            Log out
          </Button>
        </Button.Group>
      </div>
    )
  }
}
