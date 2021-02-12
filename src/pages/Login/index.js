import React, { Component } from 'react'
import { message } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { verify } from 'jsonwebtoken'
import { promisify } from 'util'

import LoginContainer from '../../containers/Login'
import { signIn } from '../../services/auth'
import { logInAction } from '../../store/Actions/auth'

class LoginPage extends Component {
  state = {
    authenticated: false,
  }

  verifyAuth = async () => {
    try {
      if(this.props.auth.token){
        await promisify(verify)(
          this.props.auth.token,
          process.env.REACT_APP_SECRET_KEY_JWT
        )
        await this.setState({ authenticated: true })
      }
    } catch (error) {
      console.error(error)
    }
  }

  success = () => {
    message.success('Bem-vindo ao Estoque')
  }

  error = () => {
    message.error('Inautorizado, confira username e senha por favor')
  }

  handleSubmit = async ({ username, password }) => {
    try {
      const { status, data } = await signIn({
        username,
        password,
        typeAccount: {
          stock: true,
        },
      })

      if (Number(status) === 401) {
        throw new Error('User UNAUTHORIZED')
      }

      await this.props.logInAction(data)
      this.verifyAuth()
      return this.state.authenticated && this.success()
    } catch (error) {
      return this.error()
    }
  }

  componentDidMount = () => {
    this.verifyAuth()
  }

  render() {
    return this.state.authenticated ? (
      <Redirect to="/logged" />
    ) : (
      <LoginContainer onSubmit={this.handleSubmit} />
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ logInAction }, dispach)
}

export default connect(mapStateToProps, mapDispacthToProps)(LoginPage)
