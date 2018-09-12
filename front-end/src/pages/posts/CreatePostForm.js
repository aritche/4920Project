import React, { Component } from 'react';
import { Button, Form, Header, TextArea } from 'semantic-ui-react';
import SearchBar from './SearchBar'
import ProcessStep from './ProcessStep'
import InputSlider from '../../widgets/InputSlider'
import DateTimePicker from './DateTimePicker'
import ItemTable from './ItemTable'
import { Link } from 'react-router-dom';
import { BUDGET } from '../../constants';

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
            date: '',
            budget: BUDGET.DEFAULT
        }
    }

    onTitleChange = (e) => {
      this.setState({title: e.target.value});
    };

    onAddressFromChange = (addressFrom) => {
        this.setState({addressFrom: addressFrom});
    }

    onAddressToChange = (addressTo) => {
        this.setState({addressTo: addressTo});
    }

    onBudgetChange = (value) => {
        if (/^[0-9]*$/g.exec(value) && value >= BUDGET.MIN && value <= BUDGET.MAX) {
            this.setState({ budget: value });
        }
    }

    createPost = () => {
        alert("Post with title [" + this.state.title + "] created!")
    };

    render() {
        return (
            <Form size={'large'} style={{marginLeft: 150, paddingBottom: 80}}>
              <ProcessStep/>

              <Header size={'large'} content={'Make Your Move!'} />
              <Form.Field>
                <Form.Input style={{width: 250}} fluid label='Title'
                            placeholder='Page Title' handleChange={this.onTitleChange} />

                <SearchBar
                  id={'from'}
                  //addrL1={this.onAddrFromL1Change}
                  addrL2={this.onAddrFromL2Change}
                  //state={this.onFromStateChange}
                  //postCode={this.onFromPostCoChange}
                />
                <br/>
                <SearchBar
                  id={'to'}
                  //addrL1={this.onAddrToL1Change}
                  addrL2={this.onAddrToL2Change}
                  //state={this.onToStateChange}
                  //postCode={this.onToPostCoChange}
                />
                <Header size={'tiny'}> When are you moving? </Header>
                <DateTimePicker/>

                <Header size={'tiny'}> What is your budget? </Header>
                <text> If you are unsure, we recommend you browsing other jobs first. </text>
                <InputSlider 
                    value={this.state.budget} 
                    onChange={this.onBudgetChange} 
                    min={BUDGET.MIN}
                    max={BUDGET.MAX}
                    step={10}
                />

                <Header size={'tiny'}> Item Detail </Header>
                <ItemTable/>


                <Header size={'tiny'}> Post Description </Header>
                <TextArea autoHeight />

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