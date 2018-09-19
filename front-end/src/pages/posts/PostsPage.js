import React, { Component } from 'react';
import PostList from './PostList';
import { Button, Container, Header, Icon, Segment, Menu, Dropdown, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import InputSlider from '../../widgets/InputSlider'
import { BUDGET } from '../../constants';

// TODO: Get from backend
// We'll use mock posts here for now
const posts = [
    {
        id: 1,
        user: "John Smith",
        title: "Test post 1",
        date: "10/09/18",
        budget: "$1000",
        addressTo: "Suburb 1",
        addressFrom: "Suburb 2",
        description: `Lorem Ipsum is simply dummy text of 
        the printing and typesetting 
        industry. Lorem Ipsum has been
        the industry's standard dummy text 
        ever since the 1500s, when an unknown
        printer took a galley of type and scrambled 
        it to make a type specimen book
        `
    },
    {
        id: 2,
        user: "Santa Claus",
        title: "Christmas Move",
        date: "25/12/18",
        budget: "$9999",
        addressTo: "North Pole",
        addressFrom: "South Pole",
        description: "Reindeers on holidays, need help :("
    }
]

const sortByOptions = [
    { key: 1, text: 'Best Match', value: 1},
    { key: 2, text: 'Price', value: 2},
    { key: 3, text: 'Most Recent', value: 3}
]

export default class PostsPage extends Component {
    constructor(){
        super();
        this.state = {
            query: '',
            budget: BUDGET.DEFAULT
        }
    }

    onQueryChange = (e) => {
        this.setState({ query: e.target.value });
    }

    onQuerySubmit = () => {
        console.log('Submitting:', this.state.query);

        alert("Searched for:  " + this.state.query);
        // Code to change to search page here
        //this.props.history.push('/')

    }

    render() {
        return (
            <Container>
                <Header as='h2'>
                    <Icon name='file alternate' />
                    <Header.Content>Posts</Header.Content>
                </Header>
                <Button as={Link} to={'/create-post'} positive>Create Post</Button>

                <Segment inverted tertiary>
                    <Menu secondary>
                        <Dropdown text='Price' floating labelled button>
                            <Dropdown.Menu style={{paddingLeft: 10, paddingRight: 10, paddingBottom:10}}>
                            <InputSlider
                                value={this.state.budget}
                                onChange={this.onBudgetChange}
                                min={BUDGET.MIN}
                                max={BUDGET.MAX}
                                steps={10}
                                icon={'dollar'}
                            />
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown text='Date' floating labelled button/>

                    <Menu.Item style={{paddingTop: 2, paddingBottom:2}} position='right'>
                        <Form onSubmit={this.onQuerySubmit}>
                            <Form.Input icon='search' style={{minWidth: 400}} placeholder='Search posts' value={this.state.query} onChange={this.onQueryChange}/>
                        </Form>
                    </Menu.Item>

                        <Menu.Menu position='right'>
                            <h4>Sort by:</h4>
                            <Dropdown selection onChange={this.onSortByChange} defaultValue={sortByOptions[0].value} options={sortByOptions} compact floating labelled button />
                        </Menu.Menu>
                    </Menu>
                </Segment>
                
                <Segment secondary>
                    <PostList posts={posts} />
                </Segment>
            </Container>
        )
    }
}
