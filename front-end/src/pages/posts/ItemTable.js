import React, { Component } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import ItemForm from './ItemForm'

/**
 * Author: VW
 */
export default class ItemTable extends Component{
    render(){
        return (
          <div>
            <Table basic='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Weight</Table.HeaderCell>
                  <Table.HeaderCell>Volume</Table.HeaderCell>
                  <Table.HeaderCell>Amount</Table.HeaderCell>
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
                    <Table.Cell>
                      <Button style={{backgroundColor: 'transparent'}} onClick={() => { this.props.deleteItem(item.name) }}>
                        <Icon size='large' name={'close'}/>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

            <div>
              <ItemForm
                addItem={this.props.addItem}
              />
              <Button negative size='large' style={{width: 100, height: 40, zIndex: 0}} animated='fade'>
                <Button.Content visible><Icon name={'trash alternate'}/></Button.Content>
                <Button.Content hidden>Delete All</Button.Content>
              </Button>
            </div>
          </div>
        );
    }
}