import React, { Component } from 'react';
import {Divider, Header} from 'semantic-ui-react';
import ConfirmationModal from "../../widgets/ConfirmationModal";

/**
 * Title: Account Dashboard
 * Author: Victor
 */
export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      open: false,
    };
  }

  close = () => {
    this.setState({open: false});
  };

  open = () => {
    this.setState({open: true});
  };

  render() {
    return (
        <div>
          <Header content={'User Information'} size={'huge'}/>
          <Header content={'Name:'} size={'medium'}/>
          <text> {this.props.name} </text>
          <Divider/>
          <Header content={'Address:'} size={'medium'}/>
          <text> {this.props.address} </text>
          <Divider/>
          <Header content={'Mobile Number:'} size={'medium'}/>
          <text> {this.props.mobile} </text>
          <Divider/>
          <Header content={'Email Address:'} size={'medium'}/>
          <text> {this.props.email} </text>
          <Divider/>
          <ConfirmationModal
            buttonText='Delete Account'
            buttonSize='small'
            buttonStyle={{width: 150, height: 50}}
            headerText='Are you sure you want to delete your account?'
            onConfirm={this.props.delete}
          />
        </div>
    )
  }
}