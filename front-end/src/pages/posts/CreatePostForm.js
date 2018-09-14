import React, { Component } from 'react';
import { Button, Form, Header, TextArea } from 'semantic-ui-react';
import SearchBar from './SearchBar'
import ProcessStep from './ProcessStep'
import InputSlider from '../../widgets/InputSlider'
import DateTimePicker from './DateTimePicker'
import ItemTable from './ItemTable'
import { Link } from 'react-router-dom';
import { BUDGET } from '../../constants';
import moment from "moment";

/**
 * Title: Post Form
 * Author: Victor & Jimmy
 */
export default class CreatePostForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            addrFromL1: '',
            addrFromL2: '',
            fromState: '',
            fromPostCo: '',
            addrToL1: '',
            addrToL2: '',
            toState: '',
            toPostCo: '',
            date: moment().endOf('day'),
            time1: moment().startOf('day'),
            time2: moment().startOf('day'),
            budget: BUDGET.DEFAULT,
            itemTable: [],
            desc: ''
        }
    }

    itemTableAdd = (name, weight, volume, desc, amount) => {
        var items = this.state.itemTable;
        items.push({name: name, weight: weight, volume: volume, desc: desc, amount: amount});
        this.setState({itemTable: items});
    }

    itemTableDelete = (name) => {
        var items = this.state.itemTable.filter(i => i.name !== name);
        this.setState({itemTable: items});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onAddrFChange = (addr) => {
        this.setState({addrFromL2: addr});
    };

    onAddrTChange = (addr) => {
        this.setState({addrToL2: addr});
    };

    onDateChange = (date) => {
        this.setState({date: date});
    };

    onTime1Change = (time1) => {
        this.setState({time1: time1});
    };

    onTime2Change = (time2) => {
        this.setState({time2: time2});
    };

    onBudgetChange = (value) => {
        if (/^[0-9]*$/g.exec(value) && value >= BUDGET.MIN && value <= BUDGET.MAX) {
            this.setState({ budget: value });
        }
    };

    createPost = () => {
        alert("Post with title [" + this.state.title + "] created!")
    };

    render() {
        return (
            <Form size={'large'} style={{marginLeft: 150, paddingBottom: 80}}>
              <ProcessStep/>

              <Header size={'large'} content={'Make Your Move!'} />
              <Form.Field>
                <Form.Input
                  style={{width: 250}} fluid label='Title'
                  placeholder='Page Title'
                  onChange={this.onChange}
                />

                <SearchBar
                  addrL1={this.state.addrFromL1}
                  addrL2={this.state.addrFromL2}
                  state={this.state.fromState}
                  postCode={this.state.fromPostCo}
                  handleC={this.onChange}
                  handleL2={this.onAddrFChange}
                />
                <br/>
                <SearchBar
                  addrL1={this.state.addrToL1}
                  addrL2={this.state.addrToL2}
                  state={this.state.toState}
                  postCode={this.state.toPostCo}
                  handleC={this.onChange}
                  handleL2={this.onAddrTChange}
                />

                <Header size={'tiny'}> When are you moving? </Header>
                <DateTimePicker
                  date={this.state.date}
                  handleD={this.onDateChange}
                  time1={this.state.time1}
                  handleT1={this.onTime1Change}
                  time2={this.state.time2}
                  handleT2={this.onTime2Change}
                />

                <Header size={'tiny'}> What is your budget? </Header>
                <p> If you are unsure, we recommend you browse other jobs first. </p>
                <InputSlider
                    value={this.state.budget}
                    onChange={this.onBudgetChange}
                    min={BUDGET.MIN}
                    max={BUDGET.MAX}
                    step={10}
                    icon={'dollar'}
                />

                <Header size={'tiny'}> Item Detail </Header>
                <ItemTable
                  table={this.state.itemTable}
                  addItem={this.itemTableAdd}
                  deleteItem={this.itemTableDelete}
                />

                <Header size={'tiny'}> Post Description </Header>
                <TextArea autoHeight placeholder={'Description'} onChange={this.onChange}/>

              </Form.Field>

              <br/>

              <Button.Group>
                <Button style={{width: 100, height: 40}} primary type='submit' onClick={this.createPost}>Post</Button>
                <span style={{width: 10}}/>
                <Button style={{width: 100, height: 40}} negative as={Link} to={'/posts'}>Discard</Button>
              </Button.Group>
            </Form>
        )
    }
}