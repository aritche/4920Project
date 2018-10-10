import React, {Component} from 'react'
import { List } from 'semantic-ui-react'
import Feed from './Feed'

export default class FeedList extends Component {
  render() {
    return (
      <List divided reflexed>
        {this.props.feeds.map((feed) =>
          <List.Item key={feed.id}>
            <Feed
              avatar={feed.concerning_details.avatar}
              dateTime={feed.update_time_string}
              name={feed.concerning_details.first_name + ' ' + feed.concerning_details.last_name}
              userId={feed.concerning_details.id}
              event={feed.event}
              detail={feed.description}
              history={this.props.history}
            />
          </List.Item>
        )}
      </List>
    )
  };
}
