import React, { Component } from 'react';
import {Image, Segment, Header, Rating, Menu} from 'semantic-ui-react';

/**
 * Title: Top
 * Author: Victor
 */
export default class Top2 extends Component {

  render() {
    return (
      <div style={{marginTop: '1%', display: 'flex'}}>
        <Segment circular size={'small'}
                 style={{paddingBottom: 1, paddingRight: 1, paddingTop: 1, paddingLeft: 1}}>
          <Image src={this.props.avatar} circular size={'small'} bordered/>
        </Segment>
        <div style={{marginTop: "3%", marginLeft: "1%"}}>
          <Header style={{color:'white'}} content={this.props.firstName + ' ' + this.props.lastName}
                  size={'huge'}/>
          <Header style={{color:'white'}} content={this.props.identity + ' joined in ' + this.props.date}
                  size={'big'}/>
          <Rating maxRating={5} defaultRating={this.props.rating} icon='star' size='huge' disabled/>
        </div>
      </div>
    )
  }
}