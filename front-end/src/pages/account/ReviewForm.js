import React, { Component } from 'react';
import {Form, TextArea, Header, Modal, Button, Icon, Rating, Image} from 'semantic-ui-react';
import { isPositiveInteger, isZero, emptyString, isPositiveFloat } from '../../utils/ValidationUtils';
import PositiveFloatInput from '../../widgets/PositiveFloatInput';
import ErrorInputModal from '../../widgets/ErrorInputModal';
import { url } from '../../Api';
import { getLoggedInUser } from '../../Authentication';

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
      speed: 0,
      content: '',
      activeForm: false,
      rating: 0,
      isMovee: true,
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
      isMovee: true
    });
  };

  onRatingChange = (e, data) => {
    const rating = data.rating;
    if (rating !== 0) {
      this.setState({rating: rating});
    }

  };

  onServiceChange = (e, data) => {
    const rating = data.rating;
    if (rating !== 0) {
      this.setState({service: rating});
    }
  };

  onReliabilityChange = (e, data) => {
    const rating = data.rating;
    if (rating !== 0) {
      this.setState({reliability: rating});
    }
  };

  onSpeedChange = (e, data) => {
    const rating = data.rating;
    if (rating !== 0) {
      this.setState({speed: rating});
    }
  };

  onContentChange = (e) => {
    this.setState({content: e.target.value});
  };

  onSubmit = () => {
    if (!this.validation()) {
      this.setState({ isLoading: true });
      fetch(url + 'submit-review', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: this.props.isMovee ? 
          JSON.stringify({
            'poster': getLoggedInUser(),
            'reviewedUser': this.props.userId,
            // 'move': this.props.postId,
            // 'review': this.state.field,
            // 'ratingGeneral': this.state.content
          })
        :
          JSON.stringify({
            'poster': getLoggedInUser(),
            'reviewedUser': this.props.userId,
            'move': this.props.postId,
            'ratingSpeed': this.state.speed,
            'ratingReliability': this.state.reliability,
            'ratingService': this.state.service,
            'review': this.state.content
          })
      }).then(response => {
        if (response.status === 200) {
          this.close();
          this.setState({ isLoading: false });
        } else if (response.status === 400) {
          response.json().then(obj => {
            this.setState({
              isLoading: false,
              errorMessage: obj.error
            }); 
          })
        } else {
          this.setState({
            isLoading: false,
            errorMessage: "Error in submitting review"
          }); 
        }
      });
    } else {
      this.setState({
        errorMessage: "Error in submitting review"
      });
    }
  };

  validation = () => {
    if (this.state.isMovee){
      return isZero(this.state.rating) || emptyString(this.state.content);
    }
    else {
      return isZero(this.state.reliability) || isZero(this.state.service) || isZero(this.state.speed)
        || emptyString(this.state.content);
    }
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
            {this.state.isMovee ?
              <div style={{display: 'flex'}}>
                <Header size={'tiny'} content={'Rating'}/>
                <span style={{width: 5}}/>
                <Rating defaultRating={0} maxRating={5} onRate={this.onRatingChange}/>
              </div>
              :
              <div style={{display: 'flex'}}>
                <div style={{display: 'flex'}}>
                  <Header size={'tiny'} content={'Service'}/>
                  <span style={{width: 5}}/>
                  <Rating defaultRating={0} maxRating={5} onRate={this.onServiceChange}/>
                </div>
                <span style={{width: 10}}/>
                <div style={{display: 'flex'}}>
                  <Header size={'tiny'} content={'Reliability'} />
                  <span style={{width: 5}}/>
                  <Rating defaultRating={0} maxRating={5} onRate={this.onReliabilityChange}/>
                </div>
                <span style={{width: 10}}/>
                <div style={{display: 'flex'}}>
                  <Header size={'tiny'} content={'Speed'} />
                  <span style={{width: 5}}/>
                  <Rating defaultRating={0} maxRating={5} onRate={this.onSpeedChange}/>
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