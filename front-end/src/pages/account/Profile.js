import React, { Component } from 'react';
import {Divider, Header, Segment, Message} from 'semantic-ui-react';
import ConfirmationModal from "../../widgets/ConfirmationModal";
import Rating from "./UserRating"

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
            <Segment>
              <text> {!!this.props.desc ? this.props.desc : 'Please tell us more about yourself by clicking Edit My Profile above.'} </text>
            </Segment>
            <Header content={'User Information'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
            <Segment>
              <Header content={'Name:'} size={'medium'}/>
              <text> {this.props.firstName + ' ' + this.props.lastName} </text>
              <Divider/>
              <Header content={'Mobile Number:'} size={'medium'}/>
              <text> {!!this.props.mobile ? this.props.mobile : 'Please tell us your mobile number by clicking Edit My Profile above.'} </text>
              <Divider/>
              <Header content={'Email Address:'} size={'medium'}/>
              <text> {this.props.email} </text>
              <Divider/>
            </Segment>
            <Header content={'Reviews'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
            {this.props.overall === 0 ?
                <Message>
                  <Message.Header>This user has not received any reviews yet</Message.Header>
                </Message>
              :
                <Rating
                  history={this.props.history}
                  avatar={this.props.avatar}
                  isMovee={this.props.identity === 'Movee'}
                  overall={this.props.overall}
                  service={this.props.service}
                  reliability={this.props.reliability}
                  speed={this.props.speed}
                  reviews={this.props.reviews}
                />
            }
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