import React, { Component } from 'react';
import {Button, Icon, Message, Table} from 'semantic-ui-react';
import ItemForm from './ItemForm'
import ConfirmationModal from '../../widgets/ConfirmationModal';

/**
 * Author: VW
 */
export default class ItemTable extends Component{
    render(){
        return (
          <div>
            {this.props.table.length === 0
            ?
            <Message>
              <Message.Header>You have not added any items yet</Message.Header>
              <p>Please add at least one</p>
            </Message>
            :
            <Table basic='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Weight</Table.HeaderCell>
                  <Table.HeaderCell>Volume</Table.HeaderCell>
                  <Table.HeaderCell>Amount</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell/>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.table.map((item) => (
                  <Table.Row key={item.name}>
                    <Table.Cell> {item.name} </Table.Cell>
                    <Table.Cell> {item.weight} </Table.Cell>
                    <Table.Cell> {item.volume} </Table.Cell>
                    <Table.Cell> {item.amount} </Table.Cell>
                    <Table.Cell> {item.description} </Table.Cell>
                    <Table.Cell>
                      <Button style={{backgroundColor: 'transparent'}} onClick={() => { this.props.deleteItem(item.name) }}>
                        <Icon size='large' name={'close'}/>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            }
            <div>
              <ItemForm
                addItem={this.props.addItem}
                itemNames={this.props.table.map(item => item.name)}
              />
              <ConfirmationModal buttonContentHtml={
                  [
                    <Button.Content key='icon' visible><Icon name={'trash alternate'}/></Button.Content>,
                    <Button.Content key='text' hidden>Delete All</Button.Content>
                  ]
                }
                buttonSize='large'
                buttonAnimated='fade'
                buttonStyle={{width: 100, height: 40, zIndex: 0, backgroundColor: '#193446', color: 'white'}}
                headerText='Are you sure you want to delete all items?'
                onConfirm={this.props.deleteAll}
              />
            </div>
          </div>
        );
    }
}