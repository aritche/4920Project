import React, {Component} from 'react'
import { Feed, Image, Button } from 'semantic-ui-react'

import ReviewForm from './ReviewForm';
import { getLoggedInUser } from '../../Authentication';

export default class SingleFeed extends Component {
  render() {
    return (
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <Image
              onClick={() => {this.props.history.push('/profile/' + this.props.userId)}}
              src={'/images/avatar/' + this.props.avatar + '.jpg'} size='tiny'
              style={{margin: '20px 0'}}/>
          </Feed.Label>
          <Feed.Content style={{display: 'flex'}}>
            <Feed.Summary style={{margin: '20px 0'}}>
              { this.props.updateType === 'close_movee' ? ' You' :
              <Feed.User onClick={() => {this.props.history.push('/profile/' + this.props.userId)}}>{this.props.name}</Feed.User>
              }
              {' ' + this.props.event}
              <Feed.Date>{this.props.dateTime}</Feed.Date>
              <Feed.Extra text style={{fontWeight: '400'}}>
                {this.props.detail}
              </Feed.Extra>
            </Feed.Summary>
            { this.props.updateType === 'close_movee' && <ReviewForm userId={this.props.userId} isMovee={false}/> }
            { this.props.updateType === 'close_removalist' && <ReviewForm userId={this.props.userId} isMovee={true}/> }
            { ['accepted', 'comment', 'offer'].includes(this.props.updateType) &&
                <Button onClick={() => {this.props.history.push('/posts/' + this.props.postId)}} size='large' style={{width: 170, height: 40, zIndex: 0,
                  backgroundColor: '#22AABB', color: 'white', marginLeft: 'auto', marginRight: '40px', marginTop: 'auto', marginBottom: 'auto'}}>
                  <Button.Content >View post</Button.Content>
                </Button>
            }
          </Feed.Content>
        </Feed.Event>
      </Feed>
)
  };
}