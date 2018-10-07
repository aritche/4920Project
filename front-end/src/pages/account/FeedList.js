import React, {Component} from 'react'
import { List, Divider } from 'semantic-ui-react'
import Feed from './Feed'

export default class FeedList extends Component {
  render() {
    return (
      <List divided reflexed>
        {this.props.feeds.map((feed) =>
          <List.Item key={feed.time}>
            <Feed
              avatar={feed.avatar}
              dateTime={feed.time}
              name={feed.name}
              event={feed.event}
              detail={feed.detail}
            />
          </List.Item>
        )}
      </List>
    )
  };
}
