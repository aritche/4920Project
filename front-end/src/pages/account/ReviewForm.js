import React, { Component } from 'react';
import {Form, TextArea, Header, Modal, Button, Icon, Rating, Image} from 'semantic-ui-react';
import { isPositiveInteger, isZero, emptyString, isPositiveFloat } from '../../utils/ValidationUtils';
import PositiveFloatInput from '../../widgets/PositiveFloatInput';
import ErrorInputModal from '../../widgets/ErrorInputModal';
import { url } from '../../Api';

/**
 * Author: VW
 */
export default class ReviewForm extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        avatar: 'default',
        first_name: '',
        last_name: ''
      },
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
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({isLoading: true});
    fetch(url + 'user/' + this.props.userId).then(response => {
      if (response.status === 200) {
        response.json().then(obj => {
          this.setState({ user: obj })
        });
      } else {
        this.setState({
          isLoading: false,
          errorMessage: 'Something went wrong'
        });
      }
    });
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
          backgroundColor: '#22AABB', color: 'white', marginLeft: 'auto', marginRight: '40px', marginTop: 'auto', marginBottom: 'auto'}}>
          <Button.Content >Leave a Review</Button.Content>
        </Button>
      } open={this.state.open} onClose={this.close} closeIcon>
        <Modal.Content>
          <Header block style={{backgroundColor: '#193446', color: 'white'}}>Leave a Review</Header>
          <br/>
          <div style={{display: 'flex'}}>
            <Image src={'/images/avatar/' + this.state.user.avatar + '.jpg'} circular size={'small'}
              style={{margin: '20px 40px 40px 40px'}}/>
            <div style={{marginTop: 'auto', marginBottom: 'auto', fontSize: '32px', fontWeight: '600'}}>{this.state.user.first_name + ' ' + this.state.user.last_name}</div>
          </div>
          <Form style={{margin: '0 20px'}}>
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
            <Icon name='checkmark' /> Submit
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