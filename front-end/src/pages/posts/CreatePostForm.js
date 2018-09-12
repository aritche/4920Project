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
            addressFrom: '',
            addressTo: '',
            date: '',
            budget: BUDGET.DEFAULT
        }
    }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

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
    }

    render() {
        return (
            <Form size={'large'} style={{marginLeft: 150, paddingBottom: 80}}>
              <ProcessStep/>

              <Header size={'large'}>Make Your Move!</Header>
              <Form.Field>
                <Form.Input style={{width: 250}} fluid label='Title'  placeholder='Page Title' />

                <SearchBar address={this.state.addressFrom} handleSelect={this.onAddressFromChange} />
                <br/>
                <SearchBar address={this.state.addressTo} handleSelect={this.onAddressToChange}/>

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
                    icon={'dollar'}
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