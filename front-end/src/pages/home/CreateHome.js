import React, { Component } from 'react';
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
          <Segment style={{paddingTop: 1, paddingLeft: 1, paddingRight: 1, backgroundColor: '#9AABB9',
            boxShadow: '2px 1px 2px #000000', paddingBottom: -1}}>
            <Container style={{backgroundColor: "#193446", borderRadius: '4px'}}>
                <br/>
                <Grid columns={2} centered>
                    <Grid.Row>
                        <Grid.Column>
                            <div className='centered-div'>
                                <Header size='huge' style={{color:'white', fontSize: '4em'}}>uMove</Header>
                                <Header as='h2' style={{color:'white'}}>Make your move today!</Header>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className='centered-div'>
                                <span style={{height: 80}}/>
                                <Signup history={this.props.history}/>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
          </Segment>
        )
    }
}
