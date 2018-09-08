import React, { Component } from 'react';
import { Button, Form, Header, Icon, Step } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchBar from './SearchBar'
import ItemInput from './ItemInput'

/**
 * Title: Post Form
 * Author: Jimmy & Victor
 */
export default class CreatePostForm extends Component {
    constructor() {
        super();
        this.from = React.createRef();
        this.to = React.createRef();
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
    onAddressFromChange() {
        //this.from.current.updateAddress().bind(this)
        //this.setState({address: a});
    }

    onAddressToChange() {
        //this.to.current.updateAddress().bind(this)
        //this.setState({address: a});
    }

    // This function should change the budget in the state with the slider, but it doesn't :(
    onBudgetChange = (e, { name, value }) => this.setState({ [name]: value })

    createPost = () => {
        alert("Post with title [" + this.state.title + "] created!")
    }

    render() {
        return (
            <Form size={'large'} style={{marginLeft: 150}}>
              <Step.Group>
                <Step active>
                  <Icon name='info' />
                  <Step.Content>
                    <Step.Title>Post</Step.Title>
                    <Step.Description>Make a post</Step.Description>
                  </Step.Content>
                </Step>

                <Step disabled>
                  <Icon name='wait' />
                  <Step.Content>
                    <Step.Title>Wait</Step.Title>
                    <Step.Description>Wait for offer</Step.Description>
                  </Step.Content>
                </Step>

                <Step disabled>
                  <Icon name='handshake' />
                  <Step.Content>
                    <Step.Title>Accept</Step.Title>
                    <Step.Description>Accept an offer</Step.Description>
                  </Step.Content>
                </Step>

                <Step disabled>
                  <Icon name='truck' />
                  <Step.Content>
                    <Step.Title>Move</Step.Title>
                    <Step.Description>Make the move!</Step.Description>
                  </Step.Content>
                </Step>

                <Step disabled>
                  <Icon name='thumbs up' />
                  <Step.Content>
                    <Step.Title>Review</Step.Title>
                    <Step.Description>Rate your removalist</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>

              <Header size={'large'}>Make Your Move!</Header>
              <Form.Field>
                <Form.Input style={{width: 250}} fluid label='Title'  placeholder='Page Title' />

                <Header size={'tiny'}> Where are you moving from? </Header>
                <SearchBar ref={this.from} handleSelect={this.onAddressFromChange()} />

                <Header size={'tiny'}> Where are you moving to? </Header>
                <SearchBar ref={this.to} handleSelect={this.onAddressToChange()}/>

                <Header size={'tiny'}> When are you moving? </Header>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="LLL"
                  timeCaption="time"
                />

                <Header size={'tiny'}> Item Detail </Header>
                <ItemInput/>

                <Header size={'tiny'}> What is your budget? </Header>
                <Form.Input
                  label={`If you are unsure, we recommend you browsing other jobs first.`}
                  // I can't get this next line to work
                  // label={`Estimated Budget: ${this.budget}`}
                  min={0}
                  max={1000}
                  name= "budget"
                  onChange={this.onBudgetChange}
                  step={5}
                  type='range'
                  value={this.budget}
                />
              </Form.Field>
              <br></br>

              <Button.Group>
                <Form.Button primary type='submit' onClick={this.createPost}>Post</Form.Button>
                <Button.Or text='or' />
                <Form.Button secondary>Save</Form.Button>
              </Button.Group>
            </Form>
         /*
            <form class='ui inverted form'>
            <Form.Field>
            <label>Post Title</label>
          <input placeholder='Title' value={this.state.title} onChange={this.onTitleChange} />
          </Form.Field>
          <Button type='submit' onClick={this.createPost}>Create</Button>
          </form>
          */
        )
    }
}