import React, { Component } from 'react';
import { Form, TextArea, Header, Modal, Button, Icon, Image, Segment, Divider, Input } from 'semantic-ui-react';
import { isZero, emptyString } from '../../utils/ValidationUtils';
import ErrorInputModal from '../../widgets/ErrorInputModal';
import m1 from '../../avatar/male1.jpg';
import m2 from '../../avatar/male2.jpg';
import m3 from '../../avatar/male3.jpg';
import m4 from '../../avatar/male4.jpg';
import m5 from '../../avatar/male5.jpg';
import m6 from '../../avatar/male6.jpg';
import m7 from '../../avatar/male7.jpg';
import f1 from '../../avatar/female1.jpg';
import f2 from '../../avatar/female2.jpg';
import f3 from '../../avatar/female3.jpg';
import f4 from '../../avatar/female4.jpg';
import f5 from '../../avatar/female5.jpg';
import f6 from '../../avatar/female6.jpg';
import f7 from '../../avatar/female7.jpg';

/**
 * Author: VW
 */
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

  onAvatarChange = (e) => {
    this.setState({avatar: e});
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
      const { avatar, firstName, lastName, email, phone, desc } = this.state;
      this.props.update(avatar, firstName, lastName, email, phone, desc);
      this.close();
    }
  };

  validation = () => {
    return !this.firstNameValid() || !this.lastNameValid()|| !this.phoneValid() || !this.emailValid();
  };

  firstNameValid = () => {
    return !emptyString(this.state.firstName);
  };

  lastNameValid = () => {
    return !emptyString(this.state.lastName);
  };

  emailValid = () => {
    return !emptyString(this.state.email) && this.state.email !== undefined && this.state.email.length >= 5
      && this.state.email.includes('@') && this.state.email.includes('.');
  };

  phoneValid = () => {
    return this.state.phone !== undefined && ((this.state.phone.length >= 5 && !isZero(this.state.phone)) || this.state.phone.length === 0);
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
          <Icon name='edit outline' />
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
                  <Image src={this.state.avatar} size={'small'} bordered circular/>
                  <Header size={'small'} centred content={'Current Profile Picture'} style={{backgroundColor: '#193446', color: 'white'}}
                  block/>
                </div>
                <span style={{width: '6%'}}/>
                <div>
                  <div style={{display: 'flex'}}>
                    <Image src={m1} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(m1)}/>
                    <Image src={m2} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(m2)}/>
                    <Image src={m3} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(m3)}/>
                    <Image src={m4} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(m4)}/>
                    <Image src={m5} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(m5)}/>
                    <Image src={m6} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(m6)}/>
                    <Image src={m7} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(m7)}/>
                  </div>
                  <br/>
                  <Divider/>
                  <br/>
                  <div style={{display: 'flex'}}>
                    <Image src={f1} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(f1)}/>
                    <Image src={f2} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(f2)}/>
                    <Image src={f3} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(f3)}/>
                    <Image src={f4} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(f4)}/>
                    <Image src={f5} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(f5)}/>
                    <Image src={f6} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(f6)}/>
                    <Image src={f7} size={'tiny'} bordered circular style={{cursor: 'pointer'}}
                           onClick={() => this.onAvatarChange(f7)}/>
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
                          autoHeight value={this.state.desc} onChange={this.onDescChange} />
            </Segment>

          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button style={{backgroundColor: '#22AABB', color: 'white'}} onClick={this.onSubmit} disabled={this.validation()}>
            <Icon name='checkmark' /> Save
          </Button>
          <Button style={{backgroundColor: '#193446', color:'white'}} onClick={this.close}>
            <Icon name='remove' /> Cancel
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