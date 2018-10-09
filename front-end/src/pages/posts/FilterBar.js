import React, { Component } from 'react';
import {Segment, Menu, Dropdown, Form, Input, Header} from 'semantic-ui-react';
import { BUDGET } from '../../constants';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const sortByOptions = [
    { key: 1, text: 'Most Recent', value: 1},
    { key: 2, text: 'Price (Low to High)', value: 2},
    { key: 3, text: 'Price (High to Low)', value: 3},
    { key: 4, text: 'Date (Early to Late)', value: 4},
    { key: 5, text: 'Date (Late to Early)', value: 5},
    { key: 6, text: 'Closest', value: 6},
];

export default class FilterBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            query: '',
            budget: BUDGET.DEFAULT,
            lowerDate: '',
            upperDate: ''
        }
    }

    onQueryChange = (e) => {
        this.setState({ query: e.target.value });
    };

    onQuerySubmit = () => {
        console.log('Submitting:', this.state.query);

        alert("Searched for:  " + this.state.query);
        // Code to change to search page here
        //this.props.history.push('/')
    };

    onFilterChange = (e) => {
        this.props.handleChange(e.target.name, e.target.value);
    };

    onlowerDateChange(date) {
        this.setState({ lowerDate: date });
        this.props.handleChange('lowerDate', date);
    }

    onUpperDateChange(date) {
        this.setState({ upperDate: date });
        this.props.handleChange('upperDate', date);
    }

    onSortByChange = (e) => {
        alert('changed sort order')
    };

    render() {
        return (
            <Segment style={{paddingTop: 10, paddingBottom: 10, backgroundColor: "#193446"}}>
              {/*<Header as='h2' style={{color: 'white'}}>
                <Icon name='file alternate' style={{color: 'white'}}/>
                Posts
              </Header>*/}
                <Menu secondary>
                    {/* <Dropdown text='Postcode' style={{maxHeight: 38, minHeight: 38}}
                              floating button simple>
                        <Dropdown.Menu style={{maxHeight: 65, minHeight: 65}}>
                            <Input name='postcode' onChange={this.onFilterChange} size='tiny' />
                        </Dropdown.Menu>
                    </Dropdown> */}
                    {/* <span style={{width: 10}}/> */}
                    <Dropdown text='Budget Range' style={{maxHeight: 38, minHeight: 38}}
                            button simple>
                        <Dropdown.Menu
                          style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10, paddingTop: 10,
                            width: "185%", maxHeight: 65, minHeight: 65}}>
                            <div style={{display: 'flex'}}>
                                <Header size={'tiny'} content={'From'} style={{marginTop: "8px"}}/>
                                <span style={{width: 10}}/>
                                <Input name='lowerBudget'
                                        onChange={this.onFilterChange} style={{width: '28%'}}/>
                                <span style={{width: 5}}/>
                                <Header size={'tiny'} content={'To'} style={{marginTop: "8px", marginLeft: "15px"}}/>
                                <span style={{width: 10}}/>
                                <Input name='upperBudget'
                                        onChange={this.onFilterChange} style={{width: '28%'}}/>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                    <span style={{width: 10}}/>
                    <Dropdown text='Time Range' style={{maxHeight: 38, minHeight: 38}}
                            button simple>
                        <Dropdown.Menu
                          style={{paddingLeft: 25, paddingRight: 25, paddingBottom: 10, paddingTop: 10, width: "320%",
                            maxHeight: 65, minHeight: 65}}>
                          <Form>
                              <Form.Group widths='equal'>
                                <div style={{display: 'flex'}}>
                                    <Header size={'tiny'} content={'From'} style={{marginTop: "8px"}}/>
                                    <span style={{width: 10}}/>
                                    <DatePicker
                                        selected={this.state.lowerDate}
                                        onChange={this.onlowerDateChange.bind(this)}
                                        showTimeSelect
                                        timeIntervals={30}
                                        dateFormat="LLL"
                                        timeFormat="HH:mm"
                                        timeCaption="Time"
                                    />
                                    <span style={{width: 10}}/>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <Header size={'tiny'} content={'To'} style={{marginTop: "8px", marginLeft: "15px"}}/>
                                    <span style={{width: 10}}/>
                                    <DatePicker
                                        selected={this.state.upperDate}
                                        name='upperDate'
                                        onChange={this.onUpperDateChange.bind(this)}
                                        showTimeSelect
                                        timeIntervals={30}
                                        dateFormat="LLL"
                                        timeFormat="HH:mm"
                                        timeCaption="Time"
                                    />
                                </div>
                              </Form.Group>
                          </Form>
                        </Dropdown.Menu>
                    </Dropdown>
                    <span style={{width: 60}}/>
                    <Menu.Item style={{paddingTop: 0, paddingBottom: 4}} position='right'>
                        <Input icon='search' name='postcode'
                            style={{minWidth: 400, maxHeight: 38, minHeight: 38}}
                            placeholder='Search postcode'
                            onChange={this.onFilterChange}
                        />
                    </Menu.Item>
                    <Menu.Menu position='right'>
                    <Header content={'Sort by'} size={'small'} style={{marginTop: 10, paddingRight: 10, color: "white"}}/>
                        <Dropdown selection autosize={'false'} onChange={this.onSortByChange}
                                  defaultValue={sortByOptions[0].value} options={sortByOptions} compact floating
                                  button
                                  style={{minWidth: 170, maxWidth: 170, maxHeight: 38, minHeight: 38}}/>
                    </Menu.Menu>
                </Menu>
            </Segment>
        )
    }
}

/*

 */
