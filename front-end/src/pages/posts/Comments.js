import React, { Component } from 'react';
import { Button, Comment, Form } from 'semantic-ui-react';
import ErrorInputModal from '../../widgets/ErrorInputModal';

/**
 * Title: Comment
 * Author: Victor
 */
export default class Comments extends Component {
    constructor() {
      super();
      this.state = {
        active: false,
      }
    }

    onCommentChange = (e) => {
      if (e.target.value.split(' ') !== '') {
        //this.props.
      }
      else {
        this.setState({active: true});
      }
    };

    onPopClose = () => {
      this.setState({active: false});
    };

    render() {
      return (
        <div>
          <Comment.Group>
            {this.props.comments.map((comment) =>
              <Comment key={comment.date}>
                <Comment.Avatar/>
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
                <Comment.Group>
                  {comment.comments.map((subCom) =>
                    <Comment key={subCom.date}>
                      <Comment.Avatar/>
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
              </Comment>
            )}
            <Form reply>
              <Form.TextArea placeholder={"Please input comment"}/>
              <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.onCommentChange} />
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