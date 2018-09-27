import React, { Component } from 'react';
import { Button, Header, Table } from 'semantic-ui-react';
import ConfirmationModal from '../../widgets/ConfirmationModal';

/**
 * Author: VW
 */
export default class PostTable extends Component{
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
                <Table.Cell> <Header size={'small'} content={item.name}/> </Table.Cell>
                <Table.Cell> {item.status} </Table.Cell>
                <Table.Cell>
                  <Button
                    content={"Go"}
                    primary
                    size='large'
                    style={{width: 140, height: 40, zIndex: 0}}
                  />
                  <ConfirmationModal buttonContentHtml={
                    [
                      <Button.Content key='text' hidden>Delete Post</Button.Content>
                    ]
                  }
                    buttonSize='large'
                    buttonStyle={{width: 140, height: 40, zIndex: 0}}
                    headerText='Are you sure you want to delete this post record?'
                    onConfirm={this.props.deleteAll}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}