import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Signup from '../signup/CreateSignupForm';
import { Segment, Container, Header, Grid } from 'semantic-ui-react';

export default class CreateLoginForm extends Component {
    constructor() {
        super();

        this.state = {
            errorMessage: 'An error has occurred.'
        }
    };

    render() {
        return (
            <Container style={{height: '80vh', backgroundColor: '#193446'}}>
                <Grid columns={2} centered>
                    <Grid.Row>
                        <Grid.Column>
                            <div className='centered-div'>
                                <Header size='huge' style={{color:'white', fontSize: '4em'}}>uMove</Header>
                                <Header as='h2' style={{color:'white'}}>Connecting movees and removalists</Header>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className='centered-div'>
                                <Signup/>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}