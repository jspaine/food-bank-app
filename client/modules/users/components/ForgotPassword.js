import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Col, Row} from 'react-bootstrap'

import selectors from '../../../store/selectors'
import {forgotPassword, clearFlags} from '../reducer'

import FieldGroup from '../../../components/form/FieldGroup'
import LoadingWrapper from '../../../components/LoadingWrapper'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.redirectIfAlreadySignedIn(this.props)
    this.state = {
      username: ""
    }
  }

  componentWillMount() {
    this.props.clearFlags()
  }

  redirectIfAlreadySignedIn(props) {
    if (props.user && props.user._id) {
      props.push('root')
    }
  }

  onFieldChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.resetPassword(this.state.username)
  }

  componentWillReceiveProps = nextProps => {
    this.redirectIfAlreadySignedIn(nextProps)
  }

  render = () =>
    <section>
      <Row>
        <Col md={12}>
          <h3 className="text-center">Restore your password</h3>
        </Col>
        <p className="small text-center">Enter your account username.</p>
        <Col xs={8} xsOffset={2} md={2} mdOffset={5}>
          <LoadingWrapper loading={this.props.fetchingUser}>
            <form className="signin form-horizontal" autoComplete="off">
              <fieldset>
                <FieldGroup
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.onFieldChange}
                />
                <div className="text-center form-group">
                  <button type="submit" onClick={this.onSubmit} disabled={this.state.username.trim() === ""} className="btn btn-primary">Submit</button>
                </div>
                {this.props.fetchUserSuccess &&
                  <div className="text-center text-success">
                    <strong>{this.props.auth.success.message}</strong>
                  </div>
                }
                {this.props.fetchUserError &&
                  <div className="text-center text-danger">
                    <strong>{this.props.auth.error}</strong>
                  </div>
                }
              </fieldset>
            </form>
          </LoadingWrapper>
        </Col>
      </Row>
    </section>
}

const mapStateToProps = state => ({
  user: selectors.user.getUser(state),
  fetchingUser: selectors.user.fetching(state),
  fetchUserError: selectors.user.error(state),
  fetchUserSuccess: selectors.user.success(state)
})

const mapDispatchToProps = dispatch => ({
  resetPassword: username => dispatch(forgotPassword({ username })),
  clearFlags: () => dispatch(clearFlags()),
  push: location => dispatch(push(location))
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
