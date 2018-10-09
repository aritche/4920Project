import React, { Component } from 'react';
import { Button, Comment, Form, Label } from 'semantic-ui-react';
import ErrorInputModal from '../../widgets/ErrorInputModal';
import { isLoggedIn, getLoggedInUser } from '../../Authentication';
import { emptyString } from '../../utils/ValidationUtils';
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
    }

    stopOffering = () => {
      this.setState({isOffering: false});
    }

    addComment = (e) => {
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
    }

    acceptOffer = (commentId) => {
      this.props.acceptOffer(commentId);
    }

    onCommentChange = (e) => {
      this.setState({comment: e.target.value});
    }

    onReplyChange = (e) => {
      this.setState({reply: e.target.value});
    }

    onPopClose = () => {
      this.setState({active: false});
    };

    startReply = (commentId) => {
      this.setState({replyingTo: commentId});
    }

    stopReply = () => {
      this.setState({replyingTo: -1});
    }

    render() {
      return (
        <div>
          <Comment.Group>
            {this.props.comments.map((comment) =>
              <Comment key={comment.id} className={ this.props.acceptedComment === comment.id ? 'bordered-selection' : ''}>
                <Comment.Avatar src={ comment.image ? comment.image : '/images/default_profile_pic.jpg'} />
                <Comment.Content>
                  { this.props.acceptedComment === comment.id ?
                    <Comment.Author as='a'>
                      <Label color='green' horizontal>
                        ACCEPTED OFFER
                      </Label>
                      { comment.poster_details.first_name + ' ' +
                      comment.poster_details.last_name + ' offered $' + comment.offer_amount }
                    </Comment.Author>
                      :
                    comment.is_offer ?
                      <Comment.Author as='a'>
                        <Label color='blue' horizontal>
                          OFFER
                        </Label>
                        { comment.poster_details.first_name + ' ' +
                        comment.poster_details.last_name + ' offers $' + comment.offer_amount }
                      </Comment.Author>
                      :
                      <Comment.Author as='a'>
                        { comment.poster_details.first_name + ' ' + comment.poster_details.last_name }
                      </Comment.Author>
                  
                  }
                  <Comment.Metadata>
                    <div> {comment.date_string} </div>
                  </Comment.Metadata>
                  <Comment.Text> {comment.text} </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action onClick={() => { this.startReply(comment.id) }}>Reply</Comment.Action>
                    { this.props.acceptedComment === -1 && comment.is_offer && this.props.isPostCreator &&
                      <Button positive size='tiny' icon='check' content='Accept' onClick={() => this.acceptOffer(comment.id)} />
                    }
                    
                  </Comment.Actions>
                  { comment.id === this.state.replyingTo &&
                    <Form reply>
                      <Form.Input value={this.state.reply} placeholder={"Type reply here"} onChange={this.onReplyChange}/>
                      <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.addReply} />
                      <Button content='Cancel' negative onClick={this.stopReply}></Button>
                    </Form>
                  }
                </Comment.Content>
                {
                  comment.child_comments.length > 0 &&
                  <Comment.Group>
                    {comment.child_comments.map((subCom) =>
                      <Comment key={subCom.id}>
                        <Comment.Avatar src={ subCom.image ? comment.image : '/images/default_profile_pic.jpg'}/>
                        <Comment.Content>
                          <Comment.Author as='a'>
                            {subCom.poster_details.first_name + ' ' + subCom.poster_details.last_name}
                          </Comment.Author>
                          <Comment.Metadata>
                          <div> {subCom.date_string} </div>
                          </Comment.Metadata>
                          <Comment.Text> {subCom.text} </Comment.Text>
                        </Comment.Content>
                      </Comment>
                    )}
                  </Comment.Group>
                }
              </Comment>
            )}
            <Form reply>
              <Form.TextArea value={this.state.comment} placeholder={"Type comment here"} onChange={this.onCommentChange}/>
              {
                !this.props.isPostCreator && this.props.acceptedComment === -1 &&
                <Button content='Make Offer' labelPosition='left' icon='handshake' positive onClick={this.startOffering} />
              }
              <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.addComment} />
            </Form>
          </Comment.Group>

          <OfferModal open={this.state.isOffering} close={this.stopOffering} budget={this.props.budget} onOffer={this.props.addOffer} />

          <ErrorInputModal
            pop={this.state.active}
            headerText={this.state.errorText}
            onClose={this.onPopClose}
          />
        </div>
      )
    }
}