import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
  FormField,
  FormFieldLabel,
  FormFieldInput,
  FormButton,
} from 'styled';

import {
  SignupFormView,
  CloseButton,
} from './styled';

import postSignup from 'lib/postSignup';

class SignupForm extends Component {
  constructor() {
    super();

    this.onClose = this.onClose.bind(this);
    this.onSignup = this.onSignup.bind(this);
  }

  onClose() {
    const {
      setHeaderContentState,
      setAppState,
      history,
    } = this.props;

    setHeaderContentState({ toggled: null });
    setAppState({ disabledBody: false });
    history.push('/' + history.location.search);    
  }

  onSignup(e) {
    e.preventDefault();

    const { setAppState } = this.props;

    const username = e.target.username.value,
          email = e.target.email.value,
          password = e.target.password.value,
          confirm = e.target.confirm.value;

    if (password === confirm) {
      postSignup({
        username,
        email,
        password,
      })
        .then(json => {
          if (json.success) {
            window.localStorage.setItem('token', json.id_token);
            this.props.setAppState({
              username: json.username,
            })
            this.onClose();
          } else {
            console.log(json.msg);
          }
        })
    }
    
  }

  render() {
    const signupFormProps = {
      onSubmit: this.onSignup,
    }

    const closeButtonProps = {
      type: 'button',
      onClick: this.onClose,
    }

    const usernameInputProps = {
      type: 'text',
      name: 'username',
      required: true,
    }

    const emailInputProps = {
      type: 'text',
      name: 'email',
      required: true,
    }

    const passwordInputProps = {
      type: 'password',
      name: 'password',
      required: true,
    }

    const confirmInputProps = {
      ...passwordInputProps,
      name: 'confirm',
    }

    return (
      <SignupFormView { ...signupFormProps } >
        <CloseButton { ...closeButtonProps } >x</CloseButton>
        <FormField>
          <FormFieldLabel >Username</FormFieldLabel>
          <FormFieldInput { ...usernameInputProps } />
        </FormField>
        <FormField>
          <FormFieldLabel >Email</FormFieldLabel>
          <FormFieldInput { ...emailInputProps } />
        </FormField>
        <FormField>
          <FormFieldLabel >Password</FormFieldLabel>
          <FormFieldInput { ...passwordInputProps } />
        </FormField>
        <FormField>
          <FormFieldLabel >Confirm Password</FormFieldLabel>
          <FormFieldInput { ...confirmInputProps } />
        </FormField>
        <FormField>
          <FormButton>Sign Up</FormButton>
        </FormField>
      </SignupFormView>
    )
  }
}

export default withRouter(SignupForm);