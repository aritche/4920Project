import React, { Component } from 'react';
import { Button, Container, Header, Icon, Segment, Menu, Dropdown, Form } from 'semantic-ui-react';
import InputSlider from '../../widgets/InputSlider'
import { BUDGET } from '../../constants';

const sortByOptions = [
    { key: 1, text: 'Best Match', value: 1},
    { key: 2, text: 'Price', value: 2},
    { key: 3, text: 'Most Recent', value: 3}
]

export default class FilterBar extends Component {
    constructor(props){
        super(props);

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
        )
    }
}
