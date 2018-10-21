import React, {Component} from 'react';
import {Button, Header, Table} from 'semantic-ui-react';
import PaginationContainer from '../../widgets/PaginationContainer';
import moment from "moment";

const POSTS_PER_PAGE = 5;

export default class PostTable extends Component {

  constructor(props) {
    super(props);
    this.routeToPost.bind(this);
    this.state = {
      postsToDisplay: [],
      redirect_to_post: -1,
      activePage: 1
    }
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
    console.log(e.target);
    this.props.history.push('/posts/' + e.target.id);
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
                <Table.Cell> <Header size={'small'} content={item.title}/> </Table.Cell>
                <Table.Cell> {moment(item.closing_datetime1).calendar()} </Table.Cell>
                <Table.Cell> {item.status} </Table.Cell>
                <Table.Cell>
                  <Button
                    content={"View"}
                    id={item.id}
                    size='large'
                    style={{
                      width: 140,
                      height: 40,
                      zIndex: 0,
                      backgroundColor: '#193446',
                      color: 'white',
                      float: 'right',
                      marginRight: '60px'
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
