import React, { Component } from 'react';
import {Divider, Header, Segment} from 'semantic-ui-react';
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
          <div>
            <Header content={'User Description'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
            <text> {this.props.desc} </text>
            <Header content={'User Information'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
            <Segment>
              <Header content={'Name:'} size={'medium'}/>
              <text> {this.props.name} </text>
              <Divider/>
              <Header content={'Mobile Number:'} size={'medium'}/>
              <text> {this.props.mobile} </text>
              <Divider/>
              <Header content={'Email Address:'} size={'medium'}/>
              <text> {this.props.email} </text>
              <Divider/>
            </Segment>
            <Header content={'User Rating'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
          </div>
          <br/>
          <ConfirmationModal
            buttonText='Delete Account'
            buttonSize='small'
            buttonStyle={{backgroundColor: '#193446', width: 130, height: 40}}
            headerText='Are you sure you want to delete your account?'
            onConfirm={this.props.delete}
          />
        </div>
    )
  }
}