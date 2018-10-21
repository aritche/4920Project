import React, { Component } from 'react';
import {Header, Rating, Comment} from 'semantic-ui-react';
import {Form} from "semantic-ui-react/dist/commonjs/collections/Form/Form";

export default class PastReviews extends Component {

  render() {
    return (
      <Comment.Group>
        {this.props.reviews.map((review) =>
          <Comment key={review.id}>
            <Comment.Avatar style={{cursor: 'pointer'}} onClick={() => {if (review.reviewer.id) this.props.history.push('/profile/' + review.reviewer.id)}} src={ '/images/avatar/' + review.reviewer.avatar + '.jpg'} />
            <Comment.Content>
              <Comment.Author style={{cursor: 'pointer'}} onClick={() => { if (review.reviewer.id) this.props.history.push('/profile/' + review.reviewer.id) }}> { review.reviewer.name } </Comment.Author>
              <Comment.Metadata style={{marginLeft: 0}}>
                <div>{review.date}</div>
              </Comment.Metadata>
              <Comment.Text style={{margin: '-5px 0 30px'}}>
                <br/>
                {this.props.isMovee ?
                  <div style={{display: 'flex'}}>
                    <Header size={'tiny'} content={'Rating'} />
                    <span style={{width: 5}}/>
                    <Rating defaultRating={review.rating_general} maxRating={5} disabled/>
                  </div>
                  :
                  <div style={{display: 'flex'}}>
                    <div style={{display: 'flex'}}>
                      <Header size={'tiny'} content={'Service'} />
                      <span style={{width: 5}}/>
                      <Rating defaultRating={review.rating_service} maxRating={5} disabled/>
                    </div>
                    <span style={{width: 10}}/>
                    <div style={{display: 'flex'}}>
                      <Header size={'tiny'} content={'Reliability'} />
                      <span style={{width: 5}}/>
                      <Rating defaultRating={review.rating_reliability} maxRating={5} disabled/>
                    </div>
                    <span style={{width: 10}}/>
                    <div style={{display: 'flex'}}>
                      <Header size={'tiny'} content={'Speed'} />
                      <span style={{width: 5}}/>
                      <Rating defaultRating={review.rating_speed} maxRating={5} disabled/>
                    </div>
                  </div>
                }
                {review.review}
              </Comment.Text>
            </Comment.Content>
          </Comment>
        )}
      </Comment.Group>
    )
  }
}