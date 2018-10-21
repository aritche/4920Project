import React, {Component} from 'react';
import {Button, Comment, Form, Icon, Label} from 'semantic-ui-react';
import ErrorInputModal from '../../widgets/ErrorInputModal';
import {isLoggedIn} from '../../Authentication';
import {emptyString} from '../../utils/ValidationUtils';
import OfferModal from './OfferModal';

/**
 * Title: Comment
 * Author: Victor
 */
export default class Comments extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      comment: '',
      reply: '',
      errorText: '',
      isOffering: false,
      replyingTo: -1
    }
  }

  startOffering = () => {
    if (!isLoggedIn()) {
      this.setState({errorText: 'Must be logged in to make an offer', active: true});
    } else {
      this.setState({isOffering: true});
    }
  };

  stopOffering = () => {
    this.setState({isOffering: false});
  };

  goToProfile = (userId) => {
    this.props.history.push('/profile/' + userId);
  };

  addComment = () => {
    if (!isLoggedIn()) {
      this.setState({errorText: 'Must be logged in to comment', active: true});
    } else if (!emptyString(this.state.comment)) {
      this.props.addComment(this.state.comment);
      this.setState({comment: ''});
    } else {
      this.setState({errorText: 'Comment cannot be empty', active: true});
    }
  };

  addReply = () => {
    if (!isLoggedIn()) {
      this.setState({errorText: 'Must be logged in to reply', active: true});
    } else if (!emptyString(this.state.reply)) {
      this.props.addReply(this.state.replyingTo, this.state.reply);
      this.setState({reply: '', replyingTo: -1});
    } else {
      this.setState({errorText: 'Reply cannot be empty', active: true});
    }
  };

  acceptOffer = (commentId) => {
    this.props.acceptOffer(commentId);
  };

  onCommentChange = (e) => {
    this.setState({comment: e.target.value});
  };

  onReplyChange = (e) => {
    this.setState({reply: e.target.value});
  };

  onPopClose = () => {
    this.setState({active: false});
  };

  startReply = (commentId) => {
    this.setState({replyingTo: commentId});
  };

  stopReply = () => {
    this.setState({replyingTo: -1});
  };

  render() {
    return (
      <div>
        <Comment.Group>
          {this.props.comments.map((comment) =>
            <Comment key={comment.id} className={this.props.acceptedComment === comment.id ? 'bordered-selection' : ''}>
              <Comment.Avatar style={{cursor: "pointer"}}
                              src={'/images/avatar/' + comment.poster_details.avatar + '.jpg'} onClick={() => {
                this.goToProfile(comment.poster_details.id)
              }}/>
              <Comment.Content>
                {this.props.acceptedComment === comment.id ?
                  <Comment.Author as='a' onClick={() => {
                    this.goToProfile(comment.poster_details.id)
                  }}>
                    <Label style={{color: '#193446'}} horizontal>
                      ACCEPTED OFFER
                    </Label>
                    {comment.poster_details.first_name + ' ' +
                    comment.poster_details.last_name + ' offered $' + comment.offer_amount}
                  </Comment.Author>
                  :
                  comment.is_offer ?
                    (comment.is_stale ?
                        <Comment.Author as='a' onClick={() => {
                          this.goToProfile(comment.poster_details.id)
                        }}>
                          <Label style={{color: '#bcbdbd'}} horizontal>
                            OLD OFFER
                          </Label>
                          {comment.poster_details.first_name + ' ' +
                          comment.poster_details.last_name + ' offers $' + comment.offer_amount}
                        </Comment.Author>
                        :
                        <Comment.Author as='a' onClick={() => {
                          this.goToProfile(comment.poster_details.id)
                        }}>
                          <Label style={{color: '#22AABB'}} horizontal>
                            OFFER
                          </Label>
                          {comment.poster_details.first_name + ' ' +
                          comment.poster_details.last_name + ' offers $' + comment.offer_amount}
                        </Comment.Author>
                    )
                    :
                    <Comment.Author as='a' onClick={() => {
                      this.goToProfile(comment.poster_details.id)
                    }}>
                      {comment.poster_details.first_name + ' ' + comment.poster_details.last_name}
                    </Comment.Author>
                }
                <Comment.Metadata>
                  <div> {comment.date_string} </div>
                  {comment.poster_details.identity === 'Movee'
                    ?
                    <div/>
                    :
                    comment.poster_details.rating_overall === 0
                      ?
                      <p>Not Rated Yet</p>
                      :
                      <div>
                        <Icon name='star'/>
                        {comment.poster_details.rating_overall}
                      </div>
                  }
                </Comment.Metadata>
                <Comment.Text> {comment.text} </Comment.Text>
                <Comment.Actions>
                  {isLoggedIn() && <Comment.Action onClick={() => {
                    this.startReply(comment.id)
                  }}>Reply</Comment.Action>}
                  {this.props.acceptedComment === -1 && comment.is_offer && this.props.isPostCreator && !comment.is_stale &&
                  <Button positive size='tiny' icon='check' content='Accept'
                          onClick={() => this.acceptOffer(comment.id)}/>
                  }

                </Comment.Actions>
                {comment.id === this.state.replyingTo &&
                <Form reply>
                  <Form.Input value={this.state.reply} placeholder={"Type reply here"} onChange={this.onReplyChange}/>
                  <Button.Group>
                    <Button content='Add Reply' labelPosition='left' icon='edit'
                            style={{backgroundColor: '#193446', color: 'white', width: 145, height: 38}}
                            onClick={this.addReply}/>
                    <Button.Or/>
                    <Button content='Cancel' style={{
                      backgroundColor: '#22AABB', color: 'white', width: 130,
                      height: 38
                    }} onClick={this.stopReply}/>
                  </Button.Group>
                </Form>
                }
              </Comment.Content>
              {
                comment.child_comments.length > 0 &&
                <Comment.Group>
                  {comment.child_comments.map((subCom) =>
                    <Comment key={subCom.id}>
                      <Comment.Avatar style={{cursor: "pointer"}}
                                      src={'/images/avatar/' + subCom.poster_details.avatar + '.jpg'} onClick={() => {
                        this.goToProfile(subCom.poster_details.id)
                      }}/>
                      <Comment.Content>
                        <Comment.Author as='a' onClick={() => {
                          this.goToProfile(subCom.poster_details.id)
                        }}>
                          {subCom.poster_details.first_name + ' ' + subCom.poster_details.last_name}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div> {subCom.date_string} </div>
                          {subCom.poster_details.user_type === 'Movee'
                            ?
                            <div/>
                            :
                            subCom.poster_details.rating_overall === 0
                              ?
                              <p>Not Rated Yet</p>
                              :
                              <div>
                                <Icon name='star'/>
                                {subCom.poster_details.rating_overall}
                              </div>
                          }
                        </Comment.Metadata>
                        <Comment.Text> {subCom.text} </Comment.Text>
                      </Comment.Content>
                    </Comment>
                  )}
                </Comment.Group>
              }
            </Comment>
          )}
          {isLoggedIn() &&
          <Form reply>
            <Form.TextArea value={this.state.comment} placeholder={"Type comment here"}
                           onChange={this.onCommentChange}/>
            {
              !this.props.isPostCreator && this.props.acceptedComment === -1 && !this.props.isMovee &&
              <Button content='Make Offer' labelPosition='left' icon='handshake' positive onClick={this.startOffering}/>
            }
            <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.addComment}/>
          </Form>
          }
        </Comment.Group>

        <OfferModal open={this.state.isOffering} close={this.stopOffering} budget={this.props.budget}
                    onOffer={this.props.addOffer}/>

        <ErrorInputModal
          pop={this.state.active}
          headerText={this.state.errorText}
          onClose={this.onPopClose}
        />
      </div>
    )
  }
}