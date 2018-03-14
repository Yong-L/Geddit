import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
  FormField,
  FormFieldLabel,
  FormFieldInput,
  FormButton,
} from 'styled';

import {
  LoginFormView,
  CloseButton,
} from './styled';

import postLogin from 'lib/postLogin';

class LoginForm extends Component {
  constructor() {
    super();

    this.onClose = this.onClose.bind(this);
    this.onLogin = this.onLogin.bind(this);
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

  onLogin(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    
    postLogin({
      username, 
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

    const passwordInputProps = {
      type: 'password',
      name: 'password',
      required: true,
    }

    const formProps = {
      onSubmit: this.onLogin,
    }

    return (
      <LoginFormView { ...formProps } >
        <CloseButton { ...closeButtonProps } >x</CloseButton>
        <FormField>
          <FormFieldLabel >Username</FormFieldLabel>
          <FormFieldInput { ...usernameInputProps } />
        </FormField>
        <FormField>
          <FormFieldLabel >Password</FormFieldLabel>
          <FormFieldInput { ...passwordInputProps } />
        </FormField>
        <FormField>
          <FormButton>Log In</FormButton>
        </FormField>
      </LoginFormView>
    )
  }
}

export default withRouter(LoginForm);