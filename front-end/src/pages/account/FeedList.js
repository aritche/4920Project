import React, {Component} from 'react'
import {List} from 'semantic-ui-react'
import Feed from './Feed'
import PaginationContainer from '../../widgets/PaginationContainer'

const ITEMS_PER_PAGE = 3;

export default class FeedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedsToDisplay: [],
      activePage: 1
    };
  }

  componentDidMount() {
    this.updateDisplayedFeed();
  }

  handlePaginationChange = (e, {activePage}) => {
    this.setState({activePage: activePage}, this.updateDisplayedFeed);
  };

  updateDisplayedFeed = () => {
    const start = (this.state.activePage - 1) * ITEMS_PER_PAGE;
    let end = this.state.activePage * ITEMS_PER_PAGE;
    end = end > this.props.feeds.length ? this.props.feeds.length : end;

    this.setState({feedsToDisplay: this.props.feeds.slice(start, end)});
  };

  render() {
    return (
      <div>
        <List divided reflexed>
          {this.state.feedsToDisplay.map((feed) =>
            <List.Item key={feed.id}>
              <Feed
                updateId={feed.id}
                avatar={feed.concerning_details.avatar}
                dateTime={feed.update_time_string}
                name={feed.concerning_details.first_name + ' ' + feed.concerning_details.last_name}
                userId={feed.concerning_details.id}
                event={feed.event}
                detail={feed.description}
                history={this.props.history}
                updateType={feed.update_type}
                postId={feed.move_id}
              />
            </List.Item>
          )}
        </List>
        <PaginationContainer
          totalItems={this.props.feeds.length}
          itemsPerPage={ITEMS_PER_PAGE}
          defaultActivePage={1}
          showDivider={true}
          handlePaginationChange={this.handlePaginationChange}
        />
      </div>
    )
  };
}
