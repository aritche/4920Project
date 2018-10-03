import React, { Component } from 'react';
import { Button, Comment, Form } from 'semantic-ui-react';
import ErrorInputModal from '../../widgets/ErrorInputModal';
import moment from 'moment';
import { getLoggedInUser } from '../../Authentication';
import { emptyString } from '../../utils/ValidationUtils';

/**
 * Title: Comment
 * Author: Victor
 */
export default class Comments extends Component {
    constructor() {
      super();
      this.state = {
        active: false,
        comment: ''
      }
    }

    addComment = (e) => {
      if (!emptyString(this.state.comment)) {
        this.props.addComment(getLoggedInUser(), moment().calendar(), this.state.comment);
        this.setState({comment: ''});
      }
      else {
        this.setState({active: true});
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
                  <Comment.Author as='a'> {comment.name} </Comment.Author>
                  <Comment.Metadata>
                    <div> {comment.date} </div>
                  </Comment.Metadata>
                  <Comment.Text> {comment.content} </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
                {
                  comment.comments.length > 0 &&
                  <Comment.Group>
                    {comment.comments.map((subCom) =>
                      <Comment key={subCom.id}>
                        <Comment.Avatar src={ comment.image ? comment.image : '/images/default_profile_pic.jpg'}/>
                        <Comment.Content>
                          <Comment.Author as='a'> {subCom.name} </Comment.Author>
                          <Comment.Metadata>
                          <div> {subCom.date} </div>
                          </Comment.Metadata>
                          <Comment.Text> {subCom.content} </Comment.Text>
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
              <Form.TextArea placeholder={"Type comment here"} onChange={this.onCommentChange}/>
              <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.addComment} />
            </Form>
          </Comment.Group>

          <ErrorInputModal
            pop={this.state.active}
            headerText={'Comment cannot be empty'}
            onClose={this.onPopClose}
          />
        </div>
      )
    }
}