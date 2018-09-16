import React, { Component } from 'react';
import { Button, Form, Grid, Message, Segment, Dropdown } from 'semantic-ui-react';

export default class CreateLoginForm extends Component {
    constructor() {
        super();
        
        this.state = {
            query: 'Search Query Goes Here'
        }
    }
    
    
    render() {
        // code is a modified version of Semantic-UI-React login template
        //   - found at https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/LoginLayout.js
        return (
            <div>
                <Segment vertical><h1>Results</h1></Segment>
                <Segment inverted tertiary>
                    <Dropdown text='Filter A' floating labelled button>
                        <Dropdown.Menu>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown text='Filter B' floating labelled button>
                        <Dropdown.Menu>
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
