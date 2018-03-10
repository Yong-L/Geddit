import React, { Component } from 'react';

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

import signup from 'lib/signup';

class SignupForm extends Component {
  constructor() {
    super();

    this.onClose = this.onClose.bind(this);
    this.onSignup = this.onSignup.bind(this);
  }

  onClose() {
    this.props.setHeaderContentState({
      toggled: null,
    })
  }

  onSignup(e) {
    e.preventDefault();

    const username = e.target.username.value,
          email = e.target.email.value,
          password = e.target.password.value,
          confirm = e.target.confirm.value;

    signup({
      username,
      email,
      password,
      confirm,
    })
      .then(json => {
        // after signup
        console.log(json);
      })
    
  }

  render() {
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
      <SignupFormView>
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

export default SignupForm;