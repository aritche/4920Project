import React, { Component } from 'react';
import {Form, TextArea, Header, Modal, Button, Icon, Rating} from 'semantic-ui-react';
import { isPositiveInteger, isZero, emptyString, isPositiveFloat } from '../../utils/ValidationUtils';
import PositiveFloatInput from '../../widgets/PositiveFloatInput';
import ErrorInputModal from '../../widgets/ErrorInputModal';

/**
 * Author: VW
 */
export default class ReviewForm extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      name: '',
      date: '',
      service: 0,
      reliability: 0,
      speed: '',
      content: '',
      activeForm: false,
      rating: 0,
      isMovee: false,
    }
  }

  close = () => {
    this.setState({open: false});
  };

  open = () => {
    this.setState({
      open: true,
      name: this.props.name,
      date: 'today',
      isMovee: this.props.identity === 'Movee'
    });
  };

  onServiceChange = (e) => {
    if (e.target.value === 0) {

    }
    else {
      this.setState({service: e});
    }

  };

  onRatingChange = (e) => {
    if (e.target.value === 0) {

    }
    else {
      this.setState({rating: e});
    }

  };

  onReliabilityChange = (e) => {
    this.setState({reliability: e});
  };

  onSpeedChange = (e) => {
    this.setState({speed: e});
  };

  onContentChange = (e) => {
    this.setState({content: e});
  };

  onSubmit = () => {
    if (!this.validation()) {
    }
    else {

    }
  };

  validation = () => {
    return isZero(this.state.reliability) || isZero(this.state.service) || isZero(this.state.speed)
      || emptyString(this.state.content);
  };

  onFormPopClose = () => {
    this.setState({activeForm: false});
  };

  render() {
    return (
      <Modal trigger={
        <Button onClick={this.open} size='large' style={{width: 170, height: 40, zIndex: 0,
          backgroundColor: '#22AABB', color: 'white'}}>
          <Button.Content >Add An Review</Button.Content>
        </Button>
      } open={this.state.open} onClose={this.close} closeIcon>
        <Modal.Content>
          <Header block style={{backgroundColor: '#193446', color: 'white'}}> Review </Header>
          <br/>
          <Form>
            {this.props.isMovee ?
              <div style={{display: 'flex'}}>
                <Header size={'tiny'} content={'Rating'}/>
                <span style={{width: 5}}/>
                <Rating defaultRating={0} maxRating={5} onClick={this.onServiceChange}/>
              </div>
              :
              <div style={{display: 'flex'}}>
                <div style={{display: 'flex'}}>
                  <Header size={'tiny'} content={'Service'}/>
                  <span style={{width: 5}}/>
                  <Rating defaultRating={0} maxRating={5} onClick={this.onServiceChange}/>
                </div>
                <span style={{width: 10}}/>
                <div style={{display: 'flex'}}>
                  <Header size={'tiny'} content={'Reliability'} />
                  <span style={{width: 5}}/>
                  <Rating defaultRating={0} maxRating={5} onClick={this.onReliabilityChange}/>
                </div>
                <span style={{width: 10}}/>
                <div style={{display: 'flex'}}>
                  <Header size={'tiny'} content={'Speed'} />
                  <span style={{width: 5}}/>
                  <Rating defaultRating={0} maxRating={5} onClick={this.onSpeedChange}/>
                </div>
              </div>
            }
            <Header content={'Review'} />
            <Form.Field error={emptyString(this.state.desc)} control={TextArea} placeholder='Please provide feedback...'
                        autoHeight value={this.state.desc} onChange={this.onContentChange}/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button style={{backgroundColor: '#22AABB', color: 'white'}} onClick={this.onSubmit} disabled={this.validation()}>
            <Icon name='checkmark' /> Post
          </Button>
          <Button style={{backgroundColor: '#193446', color: 'white'}} onClick={this.close}>
            <Icon name='remove' /> Discard
          </Button>
        </Modal.Actions>

        <ErrorInputModal
          pop={this.state.activeForm}
          headerText={'Please fill every field of this form'}
          onClose={this.onFormPopClose}
        />
      </Modal>
    );
  }
}