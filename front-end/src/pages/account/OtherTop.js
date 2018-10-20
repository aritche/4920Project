import React, { Component } from 'react';
import {Image, Segment, Header, Rating} from 'semantic-ui-react';

export default class OtherTop extends Component {

  render() {
    return (
      <div style={{marginTop: '1%', display: 'flex'}}>
        <Segment circular size={'small'}
                 style={{paddingBottom: 1, paddingRight: 1, paddingTop: 1, paddingLeft: 1, backgroundColor: 'white',
                   marginTop: '1%'}}>
          <Image src={'/images/avatar/' + this.props.avatar + '.jpg'} circular size={'small'} bordered/>
        </Segment>
        <div style={{marginTop: "3%", marginLeft: "2%"}}>
          <Header style={{color:'white'}} size={'huge'}>
            {this.props.firstName + ' ' + this.props.lastName}
            <br/>
            {<Header.Subheader style={{color:'white'}} content={this.props.identity + (!!this.props.joinedIn ? ' joined in ' + this.props.joinedIn : '')}
                               size={'big'}/>}
            <Header.Subheader size={'medium'}>
              {this.props.rating === undefined || this.props.rating === 0
                ?
                <p style={{color: 'white'}}> {' Not Rated Yet'} </p>
                :
                <Rating style={{paddingTop: '10px'}} size={'medium'} icon='star' defaultRating={this.props.rating} maxRating={5} disabled/>
              }
            </Header.Subheader>
          </Header>
        </div>
      </div>
    )
  }
}