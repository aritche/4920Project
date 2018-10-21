import React, {Component} from 'react';
import {generate} from 'password-hash';
import {url} from '../../Api';
import {updateAuthentication} from '../../Authentication';
import {Button, Form, Grid, Message, Radio, Segment} from 'semantic-ui-react';

export default class CreateSignupForm extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isLoading: false,
      confirmPassword: '',
      title: '',

      submitError: false,
      errorMessage: 'An error has occurred.',

      // validation variables
      passwordMismatch: false,
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      titleError: false
    }
  }

  onFirstNameChange = (e) => {
    this.setState({firstName: e.target.value});
  };

  onLastNameChange = (e) => {
    this.setState({lastName: e.target.value});
  };

  onEmailChange = (e) => {
    this.setState({email: e.target.value});
  };

  onPasswordChange = (e) => {
    this.setState({password: e.target.value});
  };


  onConfirmPasswordChange = (e) => {
    this.setState({confirmPassword: e.target.value});
  };

  onTitleChange = (e, {value}) => {
    this.setState({title: value})
  };

  attemptSignup = () => {
    // Input validation here
    // Assume no errors to start with
    this.setState
    ({
      passwordMismatch: false,
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      titleError: false,
      submitError: false,
    });
    let validationError = false;

    // Check that fields are not blank
    if (this.state.firstName === '') {
      this.setState({firstNameError: true});
      validationError = true;
    }

    if (this.state.lastName === '') {
      this.setState({lastNameError: true});
      validationError = true;
    }

    if (this.state.email === '') {
      this.setState({emailError: true});
      validationError = true;
    }

    if (this.state.password === '') {
      this.setState({passwordError: true});
      validationError = true;
    }


    if (this.state.confirmPassword === '') {
      this.setState({confirmPasswordError: true});
      validationError = true;
    }

    if (this.state.title === '') {
      this.setState({titleError: true});
      validationError = true;
    }

    if (validationError) {
      this.setState({errorMessage: 'No fields can be left blank.'});
      this.setState({submitError: true});
    } else {
      // Check that passwords match
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({passwordMismatch: true});
        this.setState({errorMessage: 'Passwords must match.'});
        this.setState({submitError: true});
      } else {
        // Connect to backend
        fetch(url + 'user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'email': this.state.email,
            'hashedPassword': generate(this.state.password),
            'userType': this.state.title
          })
        }).then(response => {
          if (response.status === 400) {
            response.json().then(obj => {
              this.setState({
                submitError: true,
                errorMessage: obj.error
              });
            });
          } else if (response.status === 200) {
            response.json().then(obj => {
              if (obj.success) {
                updateAuthentication(true, obj.user.id, obj.user.user_type);
                this.props.history.push('/account');
              } else {
                this.setState({
                  submitError: true,
                  errorMessage: 'Sorry, there was a problem with your submission. Please try again.',
                  isLoading: false
                });
              }
            });
            return;
          } else {
            this.setState({
              submitError: true,
              errorMessage: 'Sorry, there was a problem with your submission. Please try again.'
            });
          }
          this.setState({
            isLoading: false,
          });
        });
      }
    }
  };

  render() {
    // code is a modified version of Semantic-UI-React login template
    //   - found at https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/LoginLayout.js
    return (
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{maxWidth: 650, minHeight: '100vh'}}>
          <Form error={this.state.submitError}>
            <Segment.Group style={{}}>
              <Segment style={{backgroundColor: "#193446", boxShadow: '2px 1px 2px #000000'}} stacked>
                <h1 style={{color: 'white'}}>Join the Community!</h1>
              </Segment>
              <Segment style={{boxShadow: '2px 1px 2px #000000'}}>
                <Form.Group widths='equal'>
                  <Form.Input error={this.state.firstNameError} placeholder="First Name" icon={'user'}
                              iconPosition={'left'} value={this.state.firstName}
                              onChange={this.onFirstNameChange}/>
                  <Form.Input error={this.state.lastNameError} placeholder="Last Name" icon={'user'}
                              iconPosition={'left'} value={this.state.lastName}
                              onChange={this.onLastNameChange}/>
                </Form.Group>
                <Form.Input error={this.state.emailError} placeholder="Email" value={this.state.email}
                            icon={'mail'} iconPosition={'left'} onChange={this.onEmailChange}/>
                <Form.Input error={this.state.passwordError || this.state.passwordMismatch} icon={'key'}
                            iconPosition={'left'} placeholder="Password" type='password'
                            value={this.state.password} onChange={this.onPasswordChange}/>
                <Form.Input error={this.state.confirmPasswordError || this.state.passwordMismatch}
                            icon={'key'} iconPosition={'left'} placeholder="Confirm Password" type='password'
                            value={this.state.confirmPassword} onChange={this.onConfirmPasswordChange}/>

                <Form.Field error={this.state.titleError}>
                  <div style={{display: 'flex'}}>
                    <Radio
                      label='Movee'
                      name='radioGroup'
                      value='Movee'
                      checked={this.state.title === 'Movee'}
                      onChange={this.onTitleChange}
                    />
                    <span style={{width: 20}}/>
                    <Radio
                      label='Removalist'
                      name='radioGroup'
                      value='Removalist'
                      checked={this.state.title === 'Removalist'}
                      onChange={this.onTitleChange}
                    />
                  </div>
                </Form.Field>
                <Button fluid style={{backgroundColor: '#193446', color: 'white'}} type='submit'
                        onClick={this.attemptSignup}>Sign up</Button>
                <Message error header='Unable to Sign Up' content={this.state.errorMessage}/>
              </Segment>
            </Segment.Group>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}
