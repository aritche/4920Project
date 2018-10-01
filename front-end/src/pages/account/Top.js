import React, { Component } from 'react';
import {Image, Segment, Header, Rating, Menu} from 'semantic-ui-react';
import avatar from './elliot.jpg'

/**
 * Title: Top
 * Author: Victor
 */
export default class Top extends Component {
    state = { activeItem: 'Updates' };
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        if (name === 'Updates') {
            this.props.update();
        }
        else {
            this.props.profile();
        }
    };

    render() {
        const { activeItem } = this.state;
        return (
          <div style={{marginTop: '1%', display: 'flex'}}>
            <Segment circular size={'small'}
                     style={{paddingBottom: 1, paddingRight: 1, paddingTop: 1, paddingLeft: 1}}>
              <Image src={avatar} circular size={'small'} bordered/>
            </Segment>
            <div style={{marginTop: "3%", marginLeft: "1%"}}>
              <Header style={{color:'white'}} content={this.props.firstName + ' ' + this.props.lastName}
                      size={'huge'}/>
              <Header style={{color:'white'}} content={this.props.identity + ' joined in ' + this.props.date}
                      size={'big'}/>
              <Rating maxRating={5} defaultRating={this.props.rating} icon='star' size='huge' />
            </div>
            <Menu inverted secondary attached='top'
                  style={{height: "0%", width: "15%", marginLeft: "45%", marginTop: "11%"}}>
              <Menu.Item name='Updates' size={'big'} active={activeItem === 'Updates'} onClick={this.handleItemClick}/>
              <Menu.Item name='Profile' size={'big'} active={activeItem === 'Profile'} onClick={this.handleItemClick}/>
            </Menu>
          </div>
        )
    }
}