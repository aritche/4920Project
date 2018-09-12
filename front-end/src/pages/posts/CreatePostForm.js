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
            item: {name: '', weight: '', volume: '', desc: '', amount: ''},
            desc: ''
        }
    }

    onTitleChange = (title) => {
      this.setState({title: title.target.value});
    };

    onAddrFromL1Change = (addrL1) => {
      this.setState({addrFromL1: addrL1});
    };

    onAddrFromL2Change = (addrL2) => {
      this.setState({addrFromL2: addrL2});
    };

    onFromStateChange = (state) => {
      this.setState({fromState: state});
    };

    onFromPostCoChange = (postCode) => {
      this.setState({fromPostCo: postCode});
    };

    onAddrToL1Change = (addrL1) => {
      this.setState({addrToL1: addrL1});
    };

    onAddrToL2Change = (addrL2) => {
      this.setState({addrToL2: addrL2});
    };

    onToStateChange = (state) => {
      this.setState({toState: state});
    };

    onToPostCoChange = (postCode) => {
      this.setState({toPostCo: postCode});
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

    onDescChange = (desc) => {
      this.setState({desc: desc});
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
                  handleChange={this.onTitleChange}
                />

                <SearchBar
                  addrL1={this.state.addrFromL1}
                  handleL1={this.onAddrFromL1Change}
                  addrL2={this.state.addrFromL2}
                  handleL2={this.onAddrFromL2Change}
                  state={this.state.fromState}
                  handleState={this.onFromStateChange}
                  postCode={this.state.fromPostCo}
                  handlePC={this.onFromPostCoChange}
                />
                <br/>
                <SearchBar
                  addrL1={this.state.addrToL1}
                  handleL1={this.onAddrToL1Change}
                  addrL2={this.state.addrToL2}
                  handleL2={this.onAddrToL2Change}
                  state={this.state.toState}
                  handleState={this.onToStateChange}
                  postCode={this.state.toPostCo}
                  handlePC={this.onToPostCoChange}
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
                <text> If you are unsure, we recommend you browsing other jobs first. </text>
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
                  item={this.state.item}
                />

                <Header size={'tiny'}> Post Description </Header>
                <TextArea autoHeight placeholder={'Description'} onChange={this.onDescChange}/>

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