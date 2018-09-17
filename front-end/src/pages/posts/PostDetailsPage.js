import React, { Component } from 'react';
import { Header, Container, Comment, Form, Button, Step, Icon } from 'semantic-ui-react';

// TODO: Get from backend
const post = {
    id: 1,
    user: "John Smith",
    title: "Test post 1",
    date: "10/09/18",
    budget: "1000",
    addressTo: "Suburb 1",
    addressFrom: "Suburb 2",
    description: `Lorem Ipsum is simply dummy text of 
    the printing and typesetting 
    industry. Lorem Ipsum has been
    the industry's standard dummy text 
    ever since the 1500s, when an unknown
    printer took a galley of type and scrambled 
    it to make a type specimen book
    `
}

export default class PostDetailsPage extends Component {
    render() {        
        return (
            <Container>
                <Header as='h1'>{ post.title }</Header>
                <p class="heading-subtitle">By { post.user } <img class="heading-subtitle-icon" src='/images/default_profile_pic.jpg' alt="Default Profile"/></p>

                <p> { post.description } </p>
                <p> <b>Budget:</b> { '$' + post.budget } </p>
                <p> <b>Date:</b> { post.date } </p>

                <Step.Group widths={2}>
                    <Step active>
                        <Icon name='truck' />
                        <Step.Content>
                            <Step.Title>From Address</Step.Title>
                            <Step.Description>{ post.addressFrom }</Step.Description>
                        </Step.Content>
                    </Step>
                    <Step active>
                        <Icon name='truck' />
                        <Step.Content>
                            <Step.Title>To Address</Step.Title>
                            <Step.Description>{ post.addressTo }</Step.Description>
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