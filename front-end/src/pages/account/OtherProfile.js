import React, { Component } from 'react';
import {Divider, Header, Segment} from 'semantic-ui-react';
import Reviews from './PastReviews'
import m1 from "../../avatar/male1.jpg";

/**
 * Title: Account Dashboard
 * Author: Victor
 */
export default class OtherProfile extends Component {
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
          { !!this.props.desc &&
            <Header content={'User Description'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/> }

          <text> {this.props.desc} </text>
          <Header content={'User Information'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
          <Segment>
            <Header content={'Name:'} size={'medium'}/>
            <text> {this.props.name} </text>
            <Divider/>
            <Header content={'Email Address:'} size={'medium'}/>
            <text> {this.props.email} </text>
            <Divider/>
            { !!this.props.mobile &&
              <div>
                <Header content={'Mobile Number:'} size={'medium'}/>
                <text> {this.props.mobile} </text>
                <Divider/>
              </div>
            }
          </Segment>
          <Header content={'Past Record'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
          <Header content={'Past Rating'} size={'huge'} block style={{backgroundColor: '#193446', color: 'white'}}/>
          <Reviews
            reviews={[]}
          />
        </div>
      </div>
    )
  }
}