import React, {Component} from 'react';
import moment from "moment";
import {Button, Header, Table} from 'semantic-ui-react';
import ConfirmationModal from '../../widgets/ConfirmationModal';
import PaginationContainer from '../../widgets/PaginationContainer';
import {url} from '../../Api';

const POSTS_PER_PAGE = 5;

export default class PostRecordList extends Component {

  constructor(props) {
    super(props);
    this.routeToPost.bind(this);
    this.state = {
      postsToDisplay: [],
      redirect_to_post: -1,
      activePage: 1
    };

    this.removePostRecord = this.removePostRecord.bind(this);
  };

  componentDidMount() {
    this.updateDisplayedPosts();
  }

  handlePaginationChange = (e, {activePage}) => {
    this.setState({activePage: activePage}, this.updateDisplayedPosts);
  };

  updateDisplayedPosts = () => {
    const start = (this.state.activePage - 1) * POSTS_PER_PAGE;
    let end = this.state.activePage * POSTS_PER_PAGE;
    end = end > this.props.list.length ? this.props.list.length : end;

    this.setState({postsToDisplay: this.props.list.slice(start, end)});
  };

  routeToPost = (e) => {
    this.props.history.push('/posts/' + e.target.id);
  };

  removePostRecord = (id) => {
    fetch(url + 'remove-post-record', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'postRecordId': id
      })
    }).then(() => {
      this.props.loadPostRecords();
    });
  };

  render() {
    return (
      <div>
        <Table basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Move Time</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell/>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.postsToDisplay.map((item) => (
              <Table.Row key={item.name}>
                <Table.Cell> <Header size={'small'} content={item.name}/> </Table.Cell>
                <Table.Cell> {moment(item.closing_datetime).calendar()} </Table.Cell>
                <Table.Cell> {item.status} </Table.Cell>
                <Table.Cell>
                  <ConfirmationModal buttonContentHtml={
                    [
                      <Button.Content key='text' hidden>Remove</Button.Content>
                    ]
                  }
                      buttonSize='large'
                      buttonStyle={{
                       width: 140,
                       height: 40,
                       zIndex: 0,
                       backgroundColor: '#c24e4e',
                       color: 'white',
                       float: 'right'
                      }}
                      headerText='Are you sure you want to remove this post record?'
                      onConfirm={() => this.removePostRecord(item.id)}
                  />
                  <Button
                    content={"View"}
                    id={item.move_id}
                    size='large'
                    style={{
                      width: 140,
                      height: 40,
                      zIndex: 0,
                      backgroundColor: '#193446',
                      color: 'white',
                      float: 'right'
                    }}
                    onClick={this.routeToPost}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
                <PaginationContainer
                  totalItems={this.props.list.length}
                  itemsPerPage={POSTS_PER_PAGE}
                  defaultActivePage={1}
                  handlePaginationChange={this.handlePaginationChange}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>

        </Table>
      </div>
    );
  }
}

