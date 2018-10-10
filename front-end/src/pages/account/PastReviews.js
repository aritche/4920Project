import React, { Component } from 'react';
import {Image, Segment, Header, Menu, Rating, Grid, Comment, List, Label, Button} from 'semantic-ui-react';
import m1 from '../../avatar/male1.jpg';
import Feed from "./Feed";
import {Form} from "semantic-ui-react/dist/commonjs/collections/Form/Form";


/**
 * Title: Top
 * Author: Victor
 */
export default class PastReviews extends Component {

  render() {
    return (
      <Comment.Group>
        {this.props.reviews.map((review) =>
          <Comment key={review.id}>
            <Comment.Avatar src={ review.image ? review.image : '/images/default_profile_pic.jpg'} />
            <Comment.Content>
              <Comment.Author> {review.name} </Comment.Author>
              <Comment.Metadata>
                <div>{review.date}</div>
              </Comment.Metadata>
              <Comment.Text>
                <br/>
                <div style={{display: 'flex'}}>
                  <div style={{display: 'flex'}}>
                    <Header size={'tiny'} content={'Service'} />
                    <span style={{width: 5}}/>
                    <Rating defaultRating={review.service} maxRating={5} disabled/>
                  </div>
                  <span style={{width: 10}}/>
                  <div style={{display: 'flex'}}>
                    <Header size={'tiny'} content={'Reliability'} />
                    <span style={{width: 5}}/>
                    <Rating defaultRating={review.reliability} maxRating={5} disabled/>
                  </div>
                  <span style={{width: 10}}/>
                  <div style={{display: 'flex'}}>
                    <Header size={'tiny'} content={'Speed'} />
                    <span style={{width: 5}}/>
                    <Rating defaultRating={review.speed} maxRating={5} disabled/>
                  </div>
                </div>
                {review.content}
              </Comment.Text>
            </Comment.Content>
          </Comment>
        )}
      </Comment.Group>
    )
  }
}