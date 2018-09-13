import React, { Component } from 'react';
import { Icon, Step } from 'semantic-ui-react';

export default class ProcessStep extends Component{
  render(){
    return (
      <Step.Group>
        <Step active>
          <Icon name='info' />
          <Step.Content>
            <Step.Title>Post</Step.Title>
            <Step.Description>Make a post</Step.Description>
          </Step.Content>
        </Step>

        <Step disabled>
          <Icon name='wait' />
          <Step.Content>
            <Step.Title>Wait</Step.Title>
            <Step.Description>Wait for offer</Step.Description>
          </Step.Content>
        </Step>

        <Step disabled>
          <Icon name='handshake' />
          <Step.Content>
            <Step.Title>Accept</Step.Title>
            <Step.Description>Accept an offer</Step.Description>
          </Step.Content>
        </Step>

        <Step disabled>
          <Icon name='truck' />
          <Step.Content>
            <Step.Title>Move</Step.Title>
            <Step.Description>Make the move!</Step.Description>
          </Step.Content>
        </Step>

        <Step disabled>
          <Icon name='thumbs up' />
          <Step.Content>
            <Step.Title>Review</Step.Title>
            <Step.Description>Rate your removalist</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    );
  }
}