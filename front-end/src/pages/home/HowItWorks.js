import React, {Component} from 'react';
import {Container, Grid, Header, Segment} from 'semantic-ui-react';
import {url} from '../../Api';
import ProcessStep from './ProcessStep'

export default class HowItWorks extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    }
  };

  componentDidMount() {
    fetch(url + 'search-posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }).then(response => {
      if (response.status === 200) {
        response.json().then(obj => {
          this.setState({
            posts: obj.moves
          });
        });
      } else {
        this.setState({
          submitError: true,
          errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
          isLoading: false
        });
      }
    });
  }

  render() {
    return (
      <Segment attached secondary style={{borderRadius: '0', paddingTop: '30px', paddingBottom: '30px'}}>
        <Grid centered>
          <Grid.Row>
            <Header align='middle' as='h1'>Connecting Movees and Removalists</Header>
          </Grid.Row>
          <Grid.Row>
            <Container text align='middle' style={{paddingBottom: '35px', width: '70%'}}>
              <strong>Having trouble moving things on your own? Have a large vehicle that could help others move?
                uMove is the place for you! We strive to connect movees and removalists to make the moving process as
                simple as possible.</strong>
            </Container>
          </Grid.Row>
          <Grid.Row>
            <ProcessStep/>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}
