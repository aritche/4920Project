import React, { Component } from 'react';
import { Header, Container, Button, Step, Icon, Label, Table, Segment } from 'semantic-ui-react';
import { isLoggedIn, getLoggedInUser } from '../../Authentication';
import { url } from '../../Api';
import Comments from './Comments';

// TODO: ADD THIS OBJECT IN THE RETURNED POST OBJECT FROM BACKEND
const comments = [
    {
        id: 1,
        isOffer: false,
        name: 'Matt',
        date: 'Today at 5:42PM',
        content: 'Hey John, can we negotiate that pricing a bit?',
        comments: []
    },
    {
        id: 2,
        isOffer: false,
        name: 'Elliot Fu',
        date: 'Yesterday at 12:30AM',
        content: 'Could you give a little more detail about the flights of stairs we\'ll need to go up and down?',
        comments: [{
            id: 3,
            name: 'John Smith',
            date: 'Just now',
            content: 'It\'s on the 1st floor, so 1 flight of stairs :)',
            comments: []
        }]
    }
];

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
        this.loadComments();
    }


    loadComments = () => {
        fetch(url + 'post/' + this.state.post.id).then(response => {
            if (response.status === 200) {
                response.json().then(obj => {
                    this.setState({
                        post: obj.move,
                        items: obj.items,
                        comments: obj.comments,
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
                response.json().then(obj => {
                    this.loadComments();
                });
            } else {
                this.setState({
                    errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                    isLoading: false
                });
            }
        });
    }

    addReply = (comment_id, text) => {
        // TODO connect to backend
        alert("Replying to: [" + comment_id + "] with message: [" + text + "]")
    }

    render() {
        if (this.state.isLoading || this.state.errorMessage) {
            return 'Loading...'
        } else {
            return (
                <Container>
                    <div style={{paddingBottom: 80}}>
                        <Segment.Group stacked>
                            <Header as='h1' style={{backgroundColor: '#193446', color: 'white', padding: '20px', margin: 0}} >
                                { this.state.post.title }
                                <Label color={"blue"} key={"blue"} style={{marginLeft: '30px'}}>
                                    { this.state.post.status }
                                </Label>
                                {
                                    isLoggedIn() && getLoggedInUser() === this.state.post.movee.id &&
                                    <Button onClick={this.deletePost} style={{ marginBottom: "10px" }} negative>Delete</Button>
                                }
                                <p className="heading-subtitle" style={{ fontSize: "14px", fontWeight: "normal" }}>By { this.state.post.movee.first_name + ' ' + this.state.post.movee.last_name } <img className="heading-subtitle-icon" src='/images/default_profile_pic.jpg' alt="Default Profile"/></p>

                                <p style={{ fontSize: "14px", fontWeight: "normal" }}> { this.state.post.description } </p>
                                <p style={{ fontSize: "14px", fontWeight: "normal" }}> <b>Budget:</b> { '$' + this.state.post.budget } </p>
                                <p style={{ fontSize: "14px", fontWeight: "normal" }}> <b>Date:</b> { this.state.post.closing_datetime1 } </p>
                            </Header>
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
                                <Comments isPostCreator={getLoggedInUser() === this.state.post.movee_id} comments={this.state.comments} addComment={this.addComment} addReply={this.addReply} budget={this.state.post.budget} />
                            </Segment>
                        </Segment.Group>
                    </div>
                </Container>
            )
        }
    }
}