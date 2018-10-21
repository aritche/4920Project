import React, {Component} from 'react';
import {Header, Image, Menu, Rating, Segment} from 'semantic-ui-react';
import EditProfile from './EditProfile'

export default class Top extends Component {
  state = {activeItem: 'Updates'};
  handleItemClick = (e, {name}) => {
    this.setState({activeItem: name});
    if (name === 'Updates') {
      this.props.update();
    }
    else {
      this.props.profile();
    }
  };

  onUpdate = (avatar, firstName, lastName, email, phone, desc) => {
    this.props.profileUpdate(avatar, firstName, lastName, email, phone, desc);
  };

  render() {
    const {activeItem} = this.state;
    return (
      <div style={{marginTop: '1%', display: 'flex'}}>
        <Segment circular size={'small'}
                 style={{
                   paddingBottom: 1, paddingRight: 1, paddingTop: 1, paddingLeft: 1, backgroundColor: 'white',
                   marginTop: '1%'
                 }}>
          <Image src={'/images/avatar/' + this.props.avatar + '.jpg'} circular size={'small'} bordered/>
        </Segment>
        <div style={{marginTop: "2.3%", marginLeft: "2%"}}>
          <Header style={{color: 'white'}} size={'huge'}>
            {this.props.firstName + ' ' + this.props.lastName}
            <br/>
            {<Header.Subheader style={{color: 'white'}}
                               content={this.props.identity + (!!this.props.joinedIn ? ' joined in ' + this.props.joinedIn : '')}
                               size={'big'}/>}
            <Header.Subheader size={'medium'}>
              {this.props.rating === undefined || this.props.rating === 0
                ?
                <p style={{color: 'white'}}> {' Not Rated Yet'} </p>
                :
                <Rating style={{paddingTop: '7px', paddingBottom: '7px'}} size={'medium'} icon='star'
                        defaultRating={this.props.rating} maxRating={5} disabled/>
              }
            </Header.Subheader>
            <Header.Subheader>
              <EditProfile
                avatar={this.props.avatar}
                firstName={this.props.firstName}
                lastName={this.props.lastName}
                phone={this.props.phone}
                email={this.props.email}
                update={this.onUpdate}
              />
            </Header.Subheader>
          </Header>
        </div>
        <div style={{paddingLeft: "55%", marginTop: "6%"}}>
          <br/>
          <Menu inverted secondary attached='top'
                style={{height: "0%", width: "15%"}}>
            <Menu.Item name='Updates' size={'big'} active={activeItem === 'Updates'} onClick={this.handleItemClick}/>
            <Menu.Item name='Profile' size={'big'} active={activeItem === 'Profile'} onClick={this.handleItemClick}/>
          </Menu>
        </div>
      </div>
    )
  }
}