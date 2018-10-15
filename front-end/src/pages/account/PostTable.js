import React, { Component } from 'react';
import {Button, Header, Table, Pagination} from 'semantic-ui-react';
import ConfirmationModal from '../../widgets/ConfirmationModal';
import Page from "../../widgets/Page";

/**
 * Author: VW
 */
export default class PostTable extends Component{

  constructor(props) {
    super(props);
    this.routeToPost.bind(this);
    this.state = {
      redirect_to_post: -1
    }
  };

  routeToPost = (e) => {
    console.log(e.target);
    this.props.history.push('/posts/' + e.target.id);
  };

  render(){
    return (
      <div>
        <Table basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell/>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.list.map((item) => (
              <Table.Row key={item.name}>
                <Table.Cell> <Header size={'small'} content={item.title}/> </Table.Cell>
                <Table.Cell> {item.status} </Table.Cell>
                <Table.Cell>
                  <Button
                    content={"Go"}
                    id={item.id}
                    size='large'
                    style={{width: 140, height: 40, zIndex: 0, backgroundColor: '#193446' , color: 'white'}}
                    onClick={this.routeToPost}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
                <Page
                  current={1}
                  list={this.props.list}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>

        </Table>
      </div>
    );
  }
}