import React, { Component } from 'react';
import {Image, Segment, Header, Menu, Rating, Grid} from 'semantic-ui-react';
import m1 from '../../avatar/male1.jpg';
import Reviews from './PastReviews'


/**
 * Title: Top
 * Author: Victor
 */
export default class UserRating extends Component {

  render() {
    return (
      <div>
        <Segment>
          <Grid centered>
            <Grid.Row>
              <Segment circular size={'small'}
                       style={{paddingBottom: 1, paddingRight: 1, paddingTop: 1, paddingLeft: 1, backgroundColor: 'white', marginTop: '1%'}}>
                <Image src={m1} circular size={'small'} bordered/>
              </Segment>
            </Grid.Row>
            <Grid.Row>
              <div>
                <Header content={'Overall Rating'} />
                <Rating defaultRating={this.props.reliability} maxRating={5} disabled/>
              </div>
            </Grid.Row>
            <Grid.Row>
            <div style={{display: 'flex'}}>
              <div>
                  <Header size={'tiny'} content={'Service'} />

                  <Rating defaultRating={this.props.service} maxRating={5} disabled/>
              </div>
              <span style={{width: 10}}/>
              <div>
                <Header size={'tiny'} content={'Reliability'} />

                <Rating defaultRating={this.props.reliability} maxRating={5} disabled/>
              </div>
              <span style={{width: 10}}/>
              <div>
                <Header size={'tiny'} content={'Speed'} />

                <Rating defaultRating={this.props.speed} maxRating={5} disabled/>
              </div>
            </div>
            </Grid.Row>
          </Grid>
          <Header content={'Past Reviews'}/>
          <Reviews
            reviews={[{id: 1, name: "miaomiaomiao", image: m1, date:'2 days ago', service: 5, reliability: 5, speed: 5, content: 'It\'s so nice OMG'}]}
          />
        </Segment>

      </div>
    )
  }
}