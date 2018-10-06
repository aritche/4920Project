import React, { Component } from 'react';
import { Button, Comment, Form } from 'semantic-ui-react';
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
        errorText: '',
        isOffering: false
      }
    }

    startOffering = () => {
      this.setState({isOffering: true});
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

    onCommentChange = (e) => {
      this.setState({comment: e.target.value});
    }

    onPopClose = () => {
      this.setState({active: false});
    };

    render() {
      return (
        <div>
          <Comment.Group>
            {this.props.comments.map((comment) =>
              <Comment key={comment.id}>
                <Comment.Avatar src={ comment.image ? comment.image : '/images/default_profile_pic.jpg'} />
                <Comment.Content>
                  <Comment.Author as='a'>
                    {comment.isOffer ?
                        '[OFFER] ' + comment.poster_details.first_name + ' ' +
                        comment.poster_details.last_name + ' offers $' + comment.offer
                      :
                        comment.poster_details.first_name + ' ' + comment.poster_details.last_name
                    }
                  </Comment.Author>
                  <Comment.Metadata>
                    <div> {comment.date_string} </div>
                  </Comment.Metadata>
                  <Comment.Text> {comment.text} </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
                {
                  comment.child_comments.length > 0 &&
                  <Comment.Group>
                    {comment.child_comments.map((subCom) =>
                      <Comment key={subCom.id}>
                        <Comment.Avatar src={ subCom.image ? comment.image : '/images/default_profile_pic.jpg'}/>
                        <Comment.Content>
                          <Comment.Author as='a'>
                            {comment.poster_details.first_name + ' ' + comment.poster_details.last_name}
                          </Comment.Author>
                          <Comment.Metadata>
                          <div> {subCom.date_string} </div>
                          </Comment.Metadata>
                          <Comment.Text> {subCom.text} </Comment.Text>
                          <Comment.Actions>
                          <Comment.Action>Reply</Comment.Action>
                          </Comment.Actions>
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
                !this.props.isPostCreator &&
                <Button positive onClick={this.startOffering}>Make Offer</Button>
              }
              <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.addComment} />
            </Form>
          </Comment.Group>

          <OfferModal open={this.state.isOffering} close={this.stopOffering} budget={this.props.budget} onOffer={this.props.addComment} />

          <ErrorInputModal
            pop={this.state.active}
            headerText={this.state.errorText}
            onClose={this.onPopClose}
          />
        </div>
      )
    }
}