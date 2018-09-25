import React, { Component } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
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
              <Table.HeaderCell>Link</Table.HeaderCell>
              <Table.HeaderCell>Volume</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell/>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.table.map((item) => (
              <Table.Row key={item.name}>
                <Table.Cell> {item.name} </Table.Cell>
                <Table.Cell> {item.link} </Table.Cell>
                <Table.Cell> {item.status} </Table.Cell>
                <Table.Cell>
                  <ConfirmationModal buttonContentHtml={
                    [
                      <Button.Content key='icon' visible><Icon name={'trash alternate'}/></Button.Content>,
                      <Button.Content key='text' hidden>Delete Post</Button.Content>
                    ]
                  }
                                     buttonSize='large'
                                     buttonAnimated='fade'
                                     buttonStyle={{width: 100, height: 40, zIndex: 0}}
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