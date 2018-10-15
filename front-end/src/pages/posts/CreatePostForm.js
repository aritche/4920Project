import React, { Component } from 'react';
import { Container, Button, Form, Header, TextArea, Segment } from 'semantic-ui-react';
import moment from "moment";
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'
import InputSlider from '../../widgets/InputSlider'
import DateTimePicker from './DateTimePicker'
import ItemTable from './ItemTable'
import { BUDGET } from '../../constants';
import { url } from '../../Api';
import { getLoggedInUser } from '../../Authentication';
import {emptyString, validBudget} from '../../utils/ValidationUtils';
import ErrorInputModal from '../../widgets/ErrorInputModal';
// import Comments from './Comments'

/**
 * Title: Post Form
 * Author: Victor & Jimmy
 */
export default class CreatePostForm extends Component {
    constructor(props) {
        super(props);
        const post = props.location.state && props.location.state.post ? props.location.state.post : undefined;
        this.state = post ?
        {
            editing: true,
            postId: post.id,
            title: post.title,
            fromAddrL1: post.address_from.line1,
            fromAddrL2: post.address_from.line2,
            fromCity: post.address_from.city,
            fromState: post.address_from.state,
            fromPostCo: post.address_from.postcode,
            toAddrL1: post.address_to.line1,
            toAddrL2: post.address_to.line2,
            toCity: post.address_to.city,
            toState: post.address_to.state,
            toPostCo: post.address_to.postcode,
            date: moment(post.closing_datetime1).utcOffset(0),
            time1: moment(post.closing_datetime1).utcOffset(0),
            time2: moment(post.closing_datetime2).utcOffset(0),
            budget: post.budget,
            itemTable: props.location.state.items,
            desc: post.description,
            submitError: false,
            errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
            activeDate: false,
            activeT1: false,
            activeT2: false,
            errT: false,
        }
        : {
            editing: false,
            postId: -1,
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
            itemTable: [],
            desc: '',
            submitError: false,
            errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
            activeDate: false,
            activeT1: false,
            activeT2: false
        }
    }

    itemTableAdd = (name, weight, volume, desc, amount) => {
        let items = this.state.itemTable;
        if (!items.find(i => i.name === name )) {
            items.push({name: name, weight: weight, volume: volume, description: desc, amount: amount});
            this.setState({itemTable: items});
        }
    };

    itemTableDelete = (name) => {
        let items = this.state.itemTable.filter(i => i.name !== name);
        this.setState({itemTable: items});
    };

    itemTableDeleteAll = () => {
        this.setState({itemTable: []});
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
        if (date.isBefore(this.state.date)) {
            this.setState({activeDate: true});
        }
        else {
            this.setState({date: date});
        }
    };

    onDatePopClose = () => {
        this.setState({activeDate: false});
    };

    onTime1Change = (time1) => {
        if (time1.isAfter(this.state.time2)) {
            this.setState({activeT1: true});
        }
        else {
            this.setState({time1: time1});
        }
    };

    onTime1PopClose = () => {
        this.setState({activeT1: false});
    };

    onTime2Change = (time2) => {
        if (time2.isBefore(this.state.time1)) {
            this.setState({activeT2: true});
        }
        else {
            this.setState({time2: time2});
        }
    };

    onTime2PopClose = () => {
        this.setState({activeT2: false});
    };

    onErrorClose = () => {
        this.setState({errorT: false});
    };

    onBudgetChange = (value) => {
        if (value === '') {
            value = 0;
        }
        if (validBudget(value)) {
            this.setState({ budget: parseInt(value, 10) });
        }
    };

    createPost = () => {
        // form validation here (e.g. check title is not empty)
        let validation = [this.state.title, this.state.fromAddrL1, this.state.fromCity, this.state.fromState,
          this.state.fromPostCo, this.state.toAddrL1, this.state.toCity, this.state.toState, this.state.toPostCo,
          this.state.desc];
        if (validation.includes(" ") || this.state.itemTable.length === 0 || validation.includes("")) {
            this.setState({errorT: true});
            return;
        }
        // connect to back-end
        fetch(url + 'create-post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': this.state.postId,
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
        <Container style={{minHeight: '100vh'}}>

              <Form size={'large'} style={{paddingBottom: 80}}>

              <Segment>
                  <Form.Field>
                    <Header content={'Post Title'} size={'huge'} block
                            style={{backgroundColor: '#193446', color: 'white'}}/>
                    <Form.Input
                      error={this.state.title === undefined || emptyString(this.state.title)}
                      name='title'
                      style={{width: 250}} fluid
                      placeholder='Post Title'
                      onChange={this.onChange}
                      value={this.state.title}
                    />

                    <Header content={'Where are you moving from?'} size={'huge'} block
                            style={{backgroundColor: '#193446', color: 'white'}}/>
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

                    <Header content={'Where are you moving to?'} size={'huge'} block
                            style={{backgroundColor: '#193446', color: 'white'}}/>

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

                    <Header content={'When are you moving?'} size={'huge'} block
                            style={{backgroundColor: '#193446', color: 'white'}}/>

                    <DateTimePicker
                      date={this.state.date}
                      handleD={this.onDateChange}
                      time1={this.state.time1}
                      handleT1={this.onTime1Change}
                      time2={this.state.time2}
                      handleT2={this.onTime2Change}
                    />

                    <Header content={'What is your budget?'} size={'huge'} block
                            style={{backgroundColor: '#193446', color: 'white'}}/>

                        If you are unsure, we recommend you browse other jobs first.
                    <InputSlider
                        value={this.state.budget}
                        onChange={this.onBudgetChange}
                        min={BUDGET.MIN}
                        max={BUDGET.MAX}
                        step={10}
                        icon={'dollar'}
                    />

                    <Header content={'Item Detail'} size={'huge'} block
                            style={{backgroundColor: '#193446', color: 'white'}}/>

                    <ItemTable
                      table={this.state.itemTable}
                      addItem={this.itemTableAdd}
                      deleteItem={this.itemTableDelete}
                      deleteAll={this.itemTableDeleteAll}
                    />

                    <Header content={'Post Description'} size={'huge'} block
                            style={{backgroundColor: '#193446', color: 'white'}}/>

                    <Form.TextArea autoHeight error={emptyString(this.state.desc)} name='desc'
                              placeholder={'Description'} onChange={this.onChange} value={this.state.desc}/>

                  </Form.Field>

                  <div style={{display: 'flex'}}>
                    <Button style={{width: 100, height: 40, backgroundColor: '#22AABB', color: 'white'}}
                            type='submit' onClick={this.createPost}>{this.state.editing ? 'Edit' : 'Post'}</Button>
                    <span style={{width: 3}}/>
                    <Button style={{width: 100, height: 40, backgroundColor: '#193446', color: 'white'}}
                            as={Link} to={'/posts'}>Discard</Button>
                  </div>

                  <ErrorInputModal
                    pop={this.state.activeDate}
                    headerText={'The move date must be after today'}
                    onClose={this.onDatePopClose}
                  />

                  <ErrorInputModal
                    pop={this.state.activeT1}
                    headerText={'The from time must be before the to time'}
                    onClose={this.onTime1PopClose}
                  />

                  <ErrorInputModal
                    pop={this.state.activeT2}
                    headerText={'The to time must be before the from time'}
                    onClose={this.onTime2PopClose}
                  />

                  <ErrorInputModal
                    pop={this.state.activeT2}
                    headerText={'The to time must be before the from time'}
                    onClose={this.onTime2PopClose}
                  />

                  <ErrorInputModal
                    pop={this.state.errorT}
                    headerText={'Please fill all the necessary field'}
                    onClose={this.onErrorClose}
                  />

                </Segment>
              </Form>
        </Container>
        )
    }
}
