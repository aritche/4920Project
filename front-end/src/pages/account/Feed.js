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
              <Feed.User>Dummy 1</Feed.User> Made an offer at your post
              <Feed.Date>3 Hour Ago</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              I can do for $50
            </Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      </Feed>
)
  };
}