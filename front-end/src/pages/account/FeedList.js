import React, {Component} from 'react'
import { List} from 'semantic-ui-react'
import Feeds from './Feed'

export default class FeedList extends Component {
  render() {
    return (
      <List divided reflexed>
        <List.Item>
          <Feeds/>
        </List.Item>
        <List.Item>
          <Feeds/>
        </List.Item>
        <List.Item>
          <Feeds/>
        </List.Item>
        <List.Item>
          <Feeds/>
        </List.Item>
      </List>
    )
  };
}
