import React, { Component } from 'react';
import { Form, Segment, Dropdown, Menu } from 'semantic-ui-react';
import InputSlider from '../../widgets/InputSlider'
import { BUDGET } from '../../constants';
import PostList from '../posts/PostList';

const results = [
    {
        id: 1,
        user: "John Smith",
        title: "Looking for removalist",
        date: "10/09/18",
        budget: "$1000",
        addressTo: "Suburb 1",
        addressFrom: "Suburb 2",
        description: `Hi, I am looking for a removalist
        the printing and typesetting 
        industry. Lorem Ipsum has been
        the industry's standard dummy text 
        ever since the 1500s, when an unknown
        printer took a galley of type and scrambled 
        it to make a type specimen book`
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

export default class CreateLoginForm extends Component {
    constructor() {
        super();
        
        this.state = {
            query: 'Search Query Goes Here',
            budget: BUDGET.DEFAULT 
        }
    }

    onBudgetChange = (value) => {
        if (/^[0-9]*$/g.exec(value) && value >= BUDGET.MIN && value <= BUDGET.MAX) {
            this.setState({ budget: value });
        }
    }

    onSortByChange = (value) => {
        alert("Sorting by:  " + value);
    }
    
    render() {
        // code is a modified version of Semantic-UI-React login template
        //   - found at https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/LoginLayout.js
        return (
            <div>
                <Segment vertical><h1>Results</h1></Segment>
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
                        <Menu.Menu position='right'>
                            <h4>Sort by:</h4>
                            <Dropdown selection onChange={this.onSortByChange} defaultValue={sortByOptions[0].value} options={sortByOptions} compact floating labelled button />
                        </Menu.Menu>
                    </Menu>
                </Segment>
                        <Form onSubmit={this.onQuerySubmit}>
                            <Form.Input icon='search' style={{minWidth: 400}} placeholder='Search posts' value={this.state.query} onChange={this.onQueryChange}/>
                        </Form>
                <Segment secondary>
                    <PostList posts={results}/>
                </Segment>
            </div>
        )
    }
}
