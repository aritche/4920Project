import React, { Component } from 'react';
import { Segment, Menu, Dropdown, Form, Input, Header } from 'semantic-ui-react';
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
            postcode: ''
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

    onPostcodeChange = (e) => {
        this.setState({ postcode: e.target.value});

    };

    onSortByChange = (e) => {
        alert('changed sort order')
    };

    render() {
        return (
            <Segment inverted tertiary style={{paddingTop: 10, paddingBottom: 10}}>
                <Menu secondary>
                    <Dropdown text='Postcode' style={{maxHeight: 38, minHeight: 38}}
                              floating button simple>
                        <Dropdown.Menu style={{maxHeight: 65, minHeight: 65}}>
                            <Input onChange={this.onPostcodeChange} value={this.state.postcode}
                                   size={'tiny'} />
                        </Dropdown.Menu>
                    </Dropdown>
                    <span style={{width: 10}}/>
                    <Dropdown text='Budget Range' style={{maxHeight: 38, minHeight: 38}}
                            floating button simple>
                        <Dropdown.Menu
                          style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10, paddingTop: 10,
                            width: "185%", maxHeight: 65, minHeight: 65}}>
                            <div style={{display: 'flex'}}>
                                <Input label={'From'} onChange={this.onPostcodeChange} value={this.state.postcode}
                                       style={{width: '28%'}}/>
                                <span style={{width: 70}}/>
                                <Input label={'To'} onChange={this.onPostcodeChange} value={this.state.postcode}
                                       style={{width: '28%'}}/>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                    <span style={{width: 10}}/>
                    <Dropdown text='Time Range' style={{maxHeight: 38, minHeight: 38}}
                            floating button simple>
                        <Dropdown.Menu
                          style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10, paddingTop: 10, width: "320%",
                            maxHeight: 65, minHeight: 65}}>
                          <div style={{display: 'flex'}}>
                            <div style={{display: 'flex'}}>
                              <Header size={'tiny'} content={'From'}/>
                              <span style={{width: 10}}/>
                              <DatePicker
                                selected={this.props.time1}
                                onChange={this.onTime1Change}
                                showTimeSelect
                                timeIntervals={30}
                                dateFormat="LT"
                                timeCaption="Time"
                              />
                              <span style={{width: 10}}/>
                            </div>
                            <div style={{display: 'flex'}}>
                              <Header size={'tiny'} content={'To'}/>
                              <span style={{width: 10}}/>
                              <DatePicker
                                selected={this.props.time2}
                                onChange={this.onTime2Change}
                                showTimeSelect
                                timeIntervals={30}
                                dateFormat="LT"
                                timeCaption="Time"
                              />
                            </div>
                          </div>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item style={{paddingTop: 0, paddingBottom: 4}} position='right'>
                      <Form onSubmit={this.onQuerySubmit}>
                        <Form.Input icon='search'
                                    style={{minWidth: 400, maxHeight: 38, minHeight: 38}}
                                    placeholder='Search posts'
                                    value={this.state.query} onChange={this.onQueryChange}
                        />
                      </Form>
                    </Menu.Item>
                    <Header content={'Sort by'} size={'small'} style={{marginTop: 10}}/>
                    <Menu.Menu position='right'>
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
