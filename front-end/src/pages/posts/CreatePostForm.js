import React, { Component } from 'react';
import { Button, Form, Header, TextArea } from 'semantic-ui-react';
import SearchBar from './SearchBar'
import ProcessStep from './ProcessStep'
import BudgetSlider from './Slider'
import DateTimePicker from './DateTimePicker'
import ItemTable from './ItemTable'
import { Link } from 'react-router-dom';

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
            budget: 1000
        }
    }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    // So the following two functions are meant to bring address from the SearchBar
    // But I just can't get the ref to work :( It just keep telling me the ref is null or undefined
    onAddressFromChange = (addressFrom) => {
        this.setState({addressFrom: addressFrom});
    }

    onAddressToChange = (addressTo) => {
        this.setState({addressTo: addressTo})
    }

    // This function should change the budget in the state with the slider, but it doesn't :(
    onBudgetChange = (e, { name, value }) => this.setState({ [name]: value })

    createPost = () => {
        alert("Post with title [" + this.state.title + "] created!")
    }

    render() {
        return (
            <Form size={'large'} style={{marginTop: 30, marginLeft: 150, paddingBottom: 80}}>
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
                <BudgetSlider/>

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