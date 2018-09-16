import React, { Component } from 'react';
import { Button, Form, Grid, Message, Segment, Dropdown } from 'semantic-ui-react';
import InputSlider from '../../widgets/InputSlider'
import { BUDGET } from '../../constants';

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
    
    render() {
        // code is a modified version of Semantic-UI-React login template
        //   - found at https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/LoginLayout.js
        return (
            <div>
                <Segment vertical><h1>Results</h1></Segment>
                <Segment inverted tertiary>
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
                </Segment>
                <Segment secondary>
                    <Segment vertical>Result 1</Segment>
                    <Segment vertical>Result 2</Segment>
                    <Segment vertical>Result 3</Segment>
                </Segment>
            </div>
        )
    }
}
