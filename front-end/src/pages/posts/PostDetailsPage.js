import React, { Component } from 'react';
import { Header, Container, Comment, Form, Button, Step, Icon, Label } from 'semantic-ui-react';
import { isLoggedIn, getLoggedInUser } from '../../Authentication';
import { url } from '../../Api';
import Loading from 'react-loading';


export default class PostDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'isLoading': true,
            'post': {
                'id': props.match.params.postId,
            }
        }
    }

    componentDidMount() {
        fetch(url + 'post/' + this.state.post.id).then(response => {
            if (response.status === 200) {
                response.json().then(obj => {
                    this.setState({
                        post: obj.move,
                        isLoading: false
                    })
                    return;
                });
            } else {
                this.setState({
                    errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                    isLoading: false
                });
            }
        });
    }

    deletePost = () => {
        this.setState({isLoading: true});
        fetch(url + 'delete-post', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'postId': this.state.post.id
          })
        }).then(response => {
          if (response.status === 200) {
            response.json().then(obj => {
              if (obj.success) {
                this.props.history.push('/posts');
              } else {
                this.setState({
                  errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                  isLoading: false
                });
              }
            });
          } else {
            this.setState({
              errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
              isLoading: false
            });
          }
        });
    }

    render() {
        if (this.state.isLoading || this.state.errorMessage) {
            return 'Loading...'
        } else {
            return (
                <Container>
                    <Header as='h1'>
                        { this.state.post.title }
                        <Label color={"blue"} key={"blue"} style={{marginLeft: '30px'}}>
                            { this.state.post.status }
                        </Label>
                    </Header>
                    {
                        isLoggedIn() && getLoggedInUser() === this.state.post.movee.id &&
                        <Button onClick={this.deletePost} style={{ marginBottom: "10px" }} negative>Delete</Button>
                    }
                    <p className="heading-subtitle">By { this.state.post.movee.first_name + ' ' + this.state.post.movee.last_name } <img className="heading-subtitle-icon" src='/images/default_profile_pic.jpg' alt="Default Profile"/></p>

                    <p> { this.state.post.description } </p>
                    <p> <b>Budget:</b> { '$' + this.state.post.budget } </p>
                    <p> <b>Date:</b> { this.state.post.closing_datetime1 } </p>

                    <Step.Group widths={2}>
                        <Step active>
                            <Icon name='truck' />
                            <Step.Content>
                                <Step.Title>From Address</Step.Title>
                                <Step.Description>{ this.state.post.address_from.city }</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step active>
                            <Icon name='truck' />
                            <Step.Content>
                                <Step.Title>To Address</Step.Title>
                                <Step.Description>{ this.state.post.address_to.city }</Step.Description>
                            </Step.Content>
                        </Step>
                    </Step.Group>

                    <Comment.Group>
                        <Header as='h3' dividing>
                        Comments
                        </Header>

                        <Comment>
                        <Comment.Avatar src='/images/default_profile_pic.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>Matt</Comment.Author>
                            <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                            </Comment.Metadata>
                            <Comment.Text>Hey John, can we negotiate that pricing a bit?</Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        </Comment>

                        <Comment>
                        <Comment.Avatar src='/images/default_profile_pic.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>Elliot Fu</Comment.Author>
                            <Comment.Metadata>
                            <div>Yesterday at 12:30AM</div>
                            </Comment.Metadata>
                            <Comment.Text>
                            <p>Could you give a little more detail about the flights of stairs we'll need to go up and down?</p>
                            </Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        <Comment.Group>
                            <Comment>
                            <Comment.Avatar src='/images/default_profile_pic.jpg' />
                            <Comment.Content>
                                <Comment.Author as='a'>John Smith</Comment.Author>
                                <Comment.Metadata>
                                <div>Just now</div>
                                </Comment.Metadata>
                                <Comment.Text>It's on the 1st floor, so 1 flight of stairs :)</Comment.Text>
                                <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                            </Comment>
                        </Comment.Group>
                        </Comment>

                        <Form reply>
                        <Form.TextArea />
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                        </Form>
                    </Comment.Group>
                </Container>
            )
        }
    }
}