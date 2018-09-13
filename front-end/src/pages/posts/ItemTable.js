import React, { Component } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import ItemForm from './ItemForm'

/**
 * Author: VW
 */
export default class ItemTable extends Component{

    onItemAdd = (item) => {
        //let state = {};
        //state[name] = item;
        alert(item.name);
        //this.props.onItemTableChange(state)
    };

    onItemDelete = (table) => {
        alert(table)
    };

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
                  <Table.Row>
                    <Table.Cell> {item.name} </Table.Cell>
                    <Table.Cell> {item.weight} </Table.Cell>
                    <Table.Cell> {item.volume} </Table.Cell>
                    <Table.Cell> {item.amount} </Table.Cell>
                    <Table.Cell>
                      <Button style={{backgroundColor: 'transparent'}} onClick={this.onItemDelete}>
                        <Icon size='large' name={'close'}/>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

            <div>
              <ItemForm
                name={this.props.item.name}
                weight={this.props.item.weight}
                volume={this.props.item.volume}
                amount={this.props.item.amount}
                desc={this.props.item.desc}
                handleAdd={this.onItemAdd}
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