import React, {Component} from 'react'
import { Feed, Image} from 'semantic-ui-react'

export default class SingleFeed extends Component {
  render() {
    return (
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <Image/>
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