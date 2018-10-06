import React, { Component } from 'react';
import { Image, Rating, Card, Icon} from 'semantic-ui-react';
import avatar from './elliot.jpg';

/**
 * Title: Unit Card
 * Author: Victor
 */
export default class UserCard extends Component {

  render() {
    return (
      <div>
        <Card>
          <Image src={avatar}/>
          <Card.Content>
            <Card.Header content={this.props.userName} />
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              22 Friends
            </a>
            <Rating maxRating={5} defaultRating={3} icon='star' size='massive' />
          </Card.Content>
        </Card>
      </div>
    )
  }
}