import React, {Component} from 'react'
import { Feed, Image} from 'semantic-ui-react'
import avatar from './elliot.jpg'

export default class SingleFeed extends Component {
  render() {
    return (
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <Image src={avatar} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{this.props.name}</Feed.User> {this.props.event}
              <Feed.Date>{this.props.dateTime}</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {this.props.detail}
            </Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      </Feed>
)
  };
}