import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { verify } from 'jsonwebtoken'
import { promisify } from 'util'

import SideBar from '../components/SideBar'
import PagesRoute from '../pages'
import MobilePage from '../pages/Mobile/MobilePage'
import { logOutAction } from '../store/Actions/auth'
import './index.css'

class PrivateRoute extends Component {
  state = {
    authenticated: true,
  }

  logout = async () => {
    await this.props.logOutAction(this.props.auth.token)
  }

  verifyAuth = async () => {
    try {
      if(this.props.auth.token){
        await promisify(verify)(
          this.props.auth.token,
          process.env.REACT_APP_SECRET_KEY_JWT
        )
        return this.setState({ authenticated: true })
      }
    } catch (error) {
      console.error(error)
      return this.setState({ authenticated: false })
    }
  }

  componentDidMount = async () => {
    await this.verifyAuth()
  }


  render() {
    if (this.state.authenticated) {
      if (!this.props.auth.tecnico) {
        return (
          <div className="div-main-route">
            <div className="div-sideBar">
              <SideBar />
            </div>
            <div className="div-body">
              <Switch>
                <Route path="/logged" component={PagesRoute} />
              </Switch>
            </div>
          </div>
        )
      } else {
        return (
          <div style={{ padding: '20px' }}>
            <Switch>
              <Route path="/logged" component={MobilePage} />
              <Redirect to="/logged" />
            </Switch>
          </div>
        )
      }
    } else {
      this.logout()
      return <Redirect to="/login" />
    }
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ logOutAction }, dispach)
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(PrivateRoute)
