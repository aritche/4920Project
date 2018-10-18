import React, { Component } from 'react';
import { Header, Container, Button, Step, Icon, Label, Table, Segment, Message } from 'semantic-ui-react';
import { isLoggedIn, getLoggedInUser, getLoggedInUserType } from '../../Authentication';
import { url } from '../../Api';
import Comments from './Comments';
import ConfirmationModal from '../../widgets/ConfirmationModal';
import { userType } from '../../constants';


export default class PostDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'isLoading': true,
            'post': {
                'id': props.match.params.postId,
            },
            comments: []
        }
    }

    componentDidMount() {
        this.loadPost();
    }


    loadPost = () => {
        fetch(url + 'post/' + this.state.post.id).then(response => {
            if (response.status === 200) {
                response.json().then(obj => {
                    this.setState({
                        post: obj.move,
                        items: obj.items,
                        comments: obj.comments,
                        isLoading: false
                    });

                });
            } else {
                this.setState({
                    errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                    isLoading: false
                });
            }
        });
    };

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
    };

    closePost = () => {
        fetch(url + 'close-post', {
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
                  let post = Object.assign({}, this.state.post);
                  post.status = 'CLOSED';
                  this.setState({post});
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
    };

    editPost = () => {
        this.props.history.push({
            pathname: '/create-post',
            state: {
                post: this.state.post,
                items: this.state.items
            }
        })
    };

    addComment = (text) => {
        fetch(url + 'post-comment', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'postId': this.state.post.id,
            'userId': getLoggedInUser(),
            'commentText': text
          })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(() => {
                    this.loadPost();
                });
            } else {
                this.setState({
                    errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                    isLoading: false
                });
            }
        });
    };


    addOffer = (amount, desc) => {
        fetch(url + 'insert-offer', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'postId': this.state.post.id,
            'userId': getLoggedInUser(),
            'offerAmount': parseInt(amount, 10),
            'offerDescription': desc
          })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(() => {
                    this.loadPost();
                });
            } else {
                this.setState({
                    errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                    isLoading: false
                });
            }
        });
    };

    addReply = (comment_id, text) => {
        fetch(url + 'post-comment', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'postId': this.state.post.id,
            'userId': getLoggedInUser(),
            'commentText': text,
            'parentCommentId': comment_id
          })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(() => {
                    this.loadPost();
                });
            } else {
                this.setState({
                    errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                    isLoading: false
                });
            }
        });
    };

    acceptOffer = (commentId) => {
        fetch(url + 'accept-offer', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'postId': this.state.post.id,
            'offerId': commentId
          })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(() => {
                    this.loadPost();
                });
            } else {
                this.setState({
                    errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                    isLoading: false
                });
            }
        });
    };

    render() {
        if (this.state.isLoading || this.state.errorMessage) {
            return 'Loading...'
        } else {
            return (
                <Container>
                    <div style={{paddingBottom: 80, minHeight: '100vh'}}>
                        <Segment.Group stacked style={{boxShadow: '2px 2px 2px #000000'}}>
                            <Header as='h1' style={{backgroundColor: '#193446', color: 'white', padding: '20px', margin: 0}} >
                                { this.state.post.title }
                                <Label color={this.state.post.status === 'ACCEPTED' ? 'green' : this.state.post.status === 'CLOSED' ? 'red' : 'blue'} key={"blue"} style={{marginLeft: '25px', marginTop: '-8px'}}>
                                    { this.state.post.status }
                                </Label>
                                {
                                    isLoggedIn() && getLoggedInUser() === this.state.post.movee.id && this.state.post.status === 'OPEN' &&
                                    <ConfirmationModal
                                      buttonText='Delete'
                                      buttonStyle={{ marginBottom: "10px", float: 'right', marginRight: '30px', marginTop: '10px' }}
                                      headerText='Are you sure you want to delete this post?'
                                      onConfirm={this.deletePost}
                                    />
                                }
                                {
                                    isLoggedIn() && getLoggedInUser() === this.state.post.movee.id && this.state.post.status === 'OPEN' &&
                                    <Button primary onClick={this.editPost} style={{ marginBottom: "10px", float: 'right',
                                      marginRight: '20px', marginTop: '10px' }}>Edit</Button>
                                }
                                {
                                    isLoggedIn() && getLoggedInUser() === this.state.post.movee.id && this.state.post.status === 'ACCEPTED' &&
                                    <Button primary onClick={this.closePost} style={{ marginBottom: "10px", float: 'right',
                                      marginRight: '20px', marginTop: '10px' }}>Close</Button>
                                }

                                <p className="heading-subtitle" style={{ fontSize: "14px", fontWeight: "normal",
                                  color: 'white'}} >By <span onClick={() => {this.props.history.push('/profile/' + this.state.post.movee.id);}} className="user-link">{ this.state.post.movee.first_name + ' ' +
                                this.state.post.movee.last_name } <img circular="true" style={{cursor: "pointer", borderRadius: '50%'}} className="heading-subtitle-icon"
                                src={'/images/avatar/' + this.state.post.movee.avatar + '.jpg'}
                                alt="Default Profile"/></span></p>
                            </Header>
                            <Segment>
                              <p style={{ fontSize: "14px", fontWeight: "normal" }}> { this.state.post.description } </p>
                              <p style={{ fontSize: "14px", fontWeight: "normal" }}> <b>Budget:</b> { '$' + this.state.post.budget } </p>
                              <p style={{ fontSize: "14px", fontWeight: "normal" }}> <b>Date:</b> { this.state.post.date_string } </p>
                            </Segment>
                            <Segment style={{backgroundColor: 'white'}}>
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
                            </Segment>
                            <Segment style={{backgroundColor: 'white'}}>
                                <Header as='h3'>Items</Header>
                                <Table celled>
                                    <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Weight</Table.HeaderCell>
                                        <Table.HeaderCell>Volume</Table.HeaderCell>
                                        <Table.HeaderCell>Amount</Table.HeaderCell>
                                        <Table.HeaderCell>Description</Table.HeaderCell>
                                    </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        { this.state.items && this.state.items.map(item => {
                                            return <Table.Row key={item.name}>
                                                <Table.Cell>{item.name}</Table.Cell>
                                                <Table.Cell>{item.weight}</Table.Cell>
                                                <Table.Cell>{item.volume}</Table.Cell>
                                                <Table.Cell>{item.amount}</Table.Cell>
                                                <Table.Cell>{item.description}</Table.Cell>
                                            </Table.Row>
                                            })
                                        }
                                    </Table.Body>
                                </Table>
                            </Segment>
                            <Segment style={{backgroundColor: 'white'}}>
                                <Header as='h3' dividing>
                                    Comments
                                </Header>
                                {
                                    this.state.comments.length === 0 &&
                                    <Message>
                                    <Message.Header>No comments so far</Message.Header>
                                    <p>
                                      Be the first to add a comment!
                                    </p>
                                  </Message>
                                }
                                <Comments
                                    history={this.props.history}
                                    isPostCreator={getLoggedInUser() === this.state.post.movee_id}
                                    isMovee={getLoggedInUserType() === userType.MOVEE}
                                    comments={this.state.comments} addComment={this.addComment}
                                    addReply={this.addReply} budget={this.state.post.budget}
                                    addOffer={this.addOffer} acceptOffer={this.acceptOffer}
                                    acceptedComment={this.state.post.status !== 'OPEN' ? this.state.post.chosen_offer : -1 }
                                />
                            </Segment>
                        </Segment.Group>
                    </div>
                </Container>
            )
        }
    }
}
