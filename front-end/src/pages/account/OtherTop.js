import React, { Component } from 'react';
import {Image, Segment, Header, Rating, Menu} from 'semantic-ui-react';
import EditProfile from "./EditProfile";

/**
 * Title: Top
 * Author: Victor
 */
export default class OtherTop extends Component {

  render() {
    return (
      <div style={{marginTop: '1%', display: 'flex'}}>
        <Segment circular size={'small'}
                 style={{paddingBottom: 1, paddingRight: 1, paddingTop: 1, paddingLeft: 1, backgroundColor: 'white', marginTop: '1%'}}>
          <Image src={this.props.avatar} circular size={'small'} bordered/>
        </Segment>
        <div style={{marginTop: "5%", marginLeft: "2%"}}>
          <Header style={{color:'white'}} size={'huge'}>
            {this.props.firstName + ' ' + this.props.lastName}
            <br/>
            <Header.Subheader style={{color:'white'}} content={this.props.identity + ' joined in ' + this.props.date}
                              size={'big'}/>
          </Header>
        </div>
      </div>
    )
  }
}