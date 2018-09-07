import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class CreatePostForm extends Component {
    constructor() {
        super();
        
        this.state = {
            title: ''
        }
    }
    
    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }
    
    createPost = () => {
        alert("Post with title [" + this.state.title + "] created!")
    }
    
    render() {
        return (
             <Form>
                <Form.Field>
                    <label>Post Title</label>
                    <input placeholder='Title' value={this.state.title} onChange={this.onTitleChange} />
                </Form.Field>
                <Button type='submit' onClick={this.createPost}>Create</Button>
             </Form>
        )
    }
}