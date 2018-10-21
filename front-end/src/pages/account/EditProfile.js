import React, {Component} from 'react';
import {Button, Divider, Form, Header, Icon, Image, Modal, Segment, TextArea} from 'semantic-ui-react';
import {emptyString, isZero} from '../../utils/ValidationUtils';
import ErrorInputModal from '../../widgets/ErrorInputModal';

export default class EditProfile extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      avatar: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      desc: '',
      activeForm: false
    }
  }

  close = () => {
    this.setState({open: false});
  };

  open = () => {
    this.setState({
      open: true,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      phone: this.props.phone,
      email: this.props.email,
      avatar: this.props.avatar,
    });
  };

  onAvatarChange = (avatarName) => {
    this.setState({avatar: avatarName});
  };

  onEmailChange = (e) => {
    this.setState({email: e.target.value});
  };

  onPhoneChange = (e) => {
    this.setState({phone: e.target.value});
  };

  onFirstNameChange = (e) => {
    this.setState({firstName: e.target.value});
  };

  onLastNameChange = (e) => {
    this.setState({lastName: e.target.value});
  };

  onDescChange = (e) => {
    this.setState({desc: e.target.value});
  };

  onSubmit = () => {
    if (!this.validation()) {
      const {avatar, firstName, lastName, email, phone, desc} = this.state;
      this.props.update(avatar, firstName, lastName, email, phone, desc);
      this.close();
    }
  };

  validation = () => {
    return !this.firstNameValid() || !this.lastNameValid() || !this.phoneValid() || !this.emailValid();
  };

  firstNameValid = () => {
    return !emptyString(this.state.firstName);
  };

  lastNameValid = () => {
    return !emptyString(this.state.lastName);
  };

  emailValid = () => {
    return !emptyString(this.state.email) && this.state.email !== undefined && this.state.email.length >= 5
      && this.state.email.includes('@');
  };

  phoneValid = () => {
    return this.state.phone !== undefined && ((this.state.phone.length >= 5 &&
      !isZero(this.state.phone))) && this.state.phone.search(/[a-z]/i);
  };

  onFormPopClose = () => {
    this.setState({activeForm: false});
  };


  render() {
    return (
      <Modal trigger={
        <Button icon size={'medium'}
                style={{backgroundColor: 'transparent', color: '#22AABB', marginTop: '1%', paddingLeft: '0%'}}
                onClick={this.open}>
          <Icon name='edit outline'/>
          {'  Edit My Profile'}
        </Button>
      } open={this.state.open} onClose={this.close} closeIcon>
        <Header style={{backgroundColor: '#193446', color: 'white'}} block> Change My Profile </Header>
        <Modal.Content>
          <Form>
            <Header content={'Profile Picture'} block style={{backgroundColor: '#193446', color: 'white'}}/>
            <Segment raised>
              <div style={{display: 'flex'}}>
                <div>
                  <Image src={'/images/avatar/' + this.state.avatar + '.jpg'} size={'small'} bordered circular/>
                  <Header size={'small'} centred content={'Current Profile Picture'}
                          style={{backgroundColor: '#193446', color: 'white'}}
                          block/>
                </div>
                <span style={{width: '6%'}}/>
                <div>
                  <div style={{display: 'flex'}}>
                    <Image className="avatar_select" src={'/images/avatar/male1.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('male1')}/>
                    <Image className="avatar_select" src={'/images/avatar/male2.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('male2')}/>
                    <Image className="avatar_select" src={'/images/avatar/male3.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('male3')}/>
                    <Image className="avatar_select" src={'/images/avatar/male4.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('male4')}/>
                    <Image className="avatar_select" src={'/images/avatar/male5.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('male5')}/>
                    <Image className="avatar_select" src={'/images/avatar/male6.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('male6')}/>
                    <Image className="avatar_select" src={'/images/avatar/male7.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('male7')}/>
                  </div>
                  <br/>
                  <Divider/>
                  <br/>
                  <div style={{display: 'flex'}}>
                    <Image className="avatar_select" src={'/images/avatar/female1.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('female1')}/>
                    <Image className="avatar_select" src={'/images/avatar/female2.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('female2')}/>
                    <Image className="avatar_select" src={'/images/avatar/female3.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('female3')}/>
                    <Image className="avatar_select" src={'/images/avatar/female4.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('female4')}/>
                    <Image className="avatar_select" src={'/images/avatar/female5.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('female5')}/>
                    <Image className="avatar_select" src={'/images/avatar/female6.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('female6')}/>
                    <Image className="avatar_select" src={'/images/avatar/female7.jpg'} size={'tiny'} bordered circular
                           style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange('female7')}/>
                  </div>
                </div>
              </div>
            </Segment>

            <Header content={'Basic Information'} block style={{backgroundColor: '#193446', color: 'white'}}/>
            <Segment>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>First Name</label>
                  <Form.Input value={this.state.firstName} error={!this.firstNameValid()} fluid placeholder='First Name'
                              onChange={this.onFirstNameChange}/>
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <Form.Input value={this.state.lastName} error={!this.lastNameValid()} fluid placeholder='Last Name'
                              onChange={this.onLastNameChange}/>
                </Form.Field>
              </Form.Group>

              <Form.Field>
                <label>Email</label>
                <Form.Input value={this.state.email} error={!this.emailValid()} fluid placeholder='Email'
                            onChange={this.onEmailChange}/>
              </Form.Field>
              <Form.Field>
                <label>Phone</label>
                <Form.Input value={this.state.phone} error={!this.phoneValid()} fluid placeholder='Phone'
                            onChange={this.onPhoneChange}/>
              </Form.Field>
            </Segment>


            <Header content={'Personal Description'} block style={{backgroundColor: '#193446', color: 'white'}}/>
            <Segment>
              <Form.Field control={TextArea} placeholder='Tell people more about you...'
                          autoHeight value={this.state.desc} onChange={this.onDescChange}/>
            </Segment>

          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button style={{backgroundColor: '#22AABB', color: 'white'}} onClick={this.onSubmit}
                  disabled={this.validation()}>
            <Icon name='checkmark'/> Save
          </Button>
          <Button style={{backgroundColor: '#193446', color: 'white'}} onClick={this.close}>
            <Icon name='remove'/> Cancel
          </Button>
        </Modal.Actions>

        <ErrorInputModal
          pop={this.state.activeForm}
          headerText={'Please fill the required fields'}
          onClose={this.onFormPopClose}
        />
      </Modal>
    );
  }
}