import React, { Component } from 'react';
import { Button, Icon, Table, Modal, Header } from 'semantic-ui-react';
import ItemInput from './ItemInput'

export default class ItemTable extends Component{
  render(){
    return (
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
          <Table.Row>
            <Table.Cell>Box</Table.Cell>
            <Table.Cell>4kg</Table.Cell>
            <Table.Cell>1m^3</Table.Cell>
            <Table.Cell>10</Table.Cell>
            <Table.Cell>
              <Button style={{backgroundColor: 'transparent'}}>
                <Icon size='large' name={'close'}/>
              </Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Box</Table.Cell>
            <Table.Cell>4kg</Table.Cell>
            <Table.Cell>1m^3</Table.Cell>
            <Table.Cell>10</Table.Cell>
            <Table.Cell>
              <Button style={{backgroundColor: 'transparent'}}>
                <Icon size='large' name={'close'}/>
              </Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Box</Table.Cell>
            <Table.Cell>4kg</Table.Cell>
            <Table.Cell>1m^3</Table.Cell>
            <Table.Cell>10</Table.Cell>
            <Table.Cell>
              <Button style={{backgroundColor: 'transparent'}}>
                <Icon size='large' name={'close'}/>
              </Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Box</Table.Cell>
            <Table.Cell>4kg</Table.Cell>
            <Table.Cell>1m^3</Table.Cell>
            <Table.Cell>10</Table.Cell>
            <Table.Cell>
              <Button style={{backgroundColor: 'transparent'}}>
                <Icon size='large' name={'close'}/>
              </Button>
            </Table.Cell>
          </Table.Row>

        </Table.Body>
        <div>
          <Modal trigger={
            <Button size='large' primary style={{width: 100, height: 40, zIndex: 0}} animated='fade'>
              <Button.Content visible>
                <Icon name={'plus square'}/>
              </Button.Content>
              <Button.Content hidden>Add An Item</Button.Content>
            </Button>
          } closeIcon>
            <Header> Add Item </Header>
            <Modal.Content>
              <ItemInput/>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green'>
                <Icon name='checkmark' /> Yes
              </Button>
              <Button color='red'>
                <Icon name='remove' /> No
              </Button>
            </Modal.Actions>
          </Modal>

          <Button negative size='large' style={{width: 100, height: 40, zIndex: 0}} animated='fade'>
            <Button.Content visible><Icon name={'trash alternate'}/></Button.Content>
            <Button.Content hidden>Delete All</Button.Content>
          </Button>
        </div>
      </Table>

    );
  }
}