import React, { Component } from 'react';
import { Button, Form, Header, TextArea } from 'semantic-ui-react';
import moment from "moment";
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'
import ProcessStep from './ProcessStep'
import InputSlider from '../../widgets/InputSlider'
import DateTimePicker from './DateTimePicker'
import ItemTable from './ItemTable'
import { BUDGET } from '../../constants';
import { url } from '../../Api';
import { getLoggedInUser } from '../../Authentication';
import { validBudget } from '../../utils/ValidationUtils';

/**
 * Title: Post Form
 * Author: Victor & Jimmy
 */
export default class CreatePostForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            fromAddrL1: '',
            fromAddrL2: '',
            fromCity: '',
            fromState: '',
            fromPostCo: '',
            toAddrL1: '',
            toAddrL2: '',
            toCity: '',
            toState: '',
            toPostCo: '',
            date: moment().endOf('day'),
            time1: moment().startOf('day').hour(9),
            time2: moment().startOf('day').hour(17),
            budget: BUDGET.DEFAULT,
            item: {name: '', weight: '', volume: '', desc: '', amount:''},
            itemTable: [],
            desc: '',
            submitError: false,
            errorMessage: 'Sorry, there was a problem with your submission. Please try again.'
        }
    }

    itemTableAdd = (name, weight, volume, desc, amount) => {
        let items = this.state.itemTable;
        if (!items.find(i => i.name === name )) {
            items.push({name: name, weight: weight, volume: volume, desc: desc, amount: amount});
            this.setState({itemTable: items});
        }
    };

    itemTableDelete = (name) => {
        let items = this.state.itemTable.filter(i => i.name !== name);
        this.setState({itemTable: items});
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onAddrFChange = (addr) => {
        this.setState({fromAddrL1: addr});
    };

    onAddrTChange = (addr) => {
        this.setState({toAddrL1: addr});
    };

    onDateChange = (date) => {
        this.setState({date: date});
    };

    onTime1Change = (time1) => {
        if (time1.isAfter(this.state.time2)) {
            alert("From time must be before the to time")
        }
        else {
            this.setState({time1: time1});
        }
    };

    onTime2Change = (time2) => {
        if (time2.isBefore(this.state.time1)) {
            alert("To time must be after the from time")
        }
        else {
            this.setState({time2: time2});
        }
    };

    onBudgetChange = (value) => {
        if (value === '') {
            value = 0;
        }
        if (validBudget(value)) {
            this.setState({ budget: parseInt(value) });
        }
    };

    createPost = () => {
        // form validation here (e.g. check title is not empty)

        // connect to back-end
        fetch(url + 'create-post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': this.state.title,
                'fromAddrL1': this.state.fromAddrL1,
                'fromAddrL2': this.state.fromAddrL2,
                'fromCity': this.state.fromCity,
                'fromState': this.state.fromState,
                'fromPostCo': this.state.fromPostCo,
                'toAddrL1': this.state.toAddrL1,
                'toAddrL2': this.state.toAddrL2,
                'toCity': this.state.toCity,
                'toState': this.state.toState,
                'toPostCo': this.state.toPostCo,
                'date': this.state.date.format('DD/MM/YYYY'),
                'time1': this.state.time1.format('HH:mm'),
                'time2': this.state.time2.format('HH:mm'),
                'budget': this.state.budget,
                'desc': this.state.desc,
                'items': this.state.itemTable,
                'userId': getLoggedInUser()
            })
        }).then(response => {
            if (response.status === 400) {
                response.json().then(obj => {
                    this.setState({
                        submitError: true,
                        errorMessage: obj.error,
                    });
                });
            } else if (response.status === 200) {
                response.json().then(obj => {
                    if (obj.success) {
                        this.props.history.push('/posts/' + obj.move.id);
                    } else {
                        this.setState({
                            submitError: true,
                            errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                            isLoading: false
                        });
                    }
                });
                return;
            } else {
                this.setState({
                    submitError: true,
                    errorMessage: 'Sorry, there was a problem with your submission. Please try again.'
                });
            }
            this.setState({
                isLoading: false,
            });
        });
    };

    render() {
        return (
            <Form size={'large'} style={{paddingBottom: 80}}>
              <ProcessStep/>

              <Header size={'large'} content={'Make Your Move!'} />
              <Form.Field>
                <Form.Input
                  name='title'
                  style={{width: 250}} fluid label='Title'
                  placeholder='Post Title'
                  onChange={this.onChange}
                />

                <SearchBar
                  lowerIdent='from'
                  upperIdent='From'
                  addrL1={this.state.fromAddrL1}
                  addrL2={this.state.fromAddrL2}
                  city={this.state.fromCity}
                  state={this.state.fromState}
                  postCode={this.state.fromPostCo}
                  l1N={"fromAddrL1"}
                  l2N={"fromAddrL2"}
                  cityN={'fromCity'}
                  stateN={"fromState"}
                  postN={"fromPostCo"}
                  handleC={this.onChange}
                  handleL1={this.onAddrFChange}
                />
                <br/>
                <SearchBar
                  lowerIdent='to'
                  upperIdent='To'
                  addrL1={this.state.toAddrL1}
                  addrL2={this.state.toAddrL2}
                  city={this.state.toCity}
                  state={this.state.toState}
                  postCode={this.state.toPostCo}
                  l1N={"toAddrL1"}
                  l2N={"toAddrL2"}
                  cityN={'toCity'}
                  stateN={"toState"}
                  postN={"toPostCo"}
                  handleC={this.onChange}
                  handleL1={this.onAddrTChange}
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
                <TextArea autoHeight name='desc' placeholder={'Description'} onChange={this.onChange}/>

              </Form.Field>

              <br/>

              <div style={{display: 'flex'}}>
                <Button style={{width: 100, height: 40}} primary type='submit' onClick={this.createPost}>Post</Button>
                <span style={{width: 10}}/>
                <Button style={{width: 100, height: 40}} negative as={Link} to={'/posts'}>Discard</Button>
              </div>
            </Form>
        )
    }
}