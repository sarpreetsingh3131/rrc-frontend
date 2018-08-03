import React from 'react'

import { PUT, VALIDATE_TOKEN_URL, LOGIN_URL, ADMIN_URL, CATEGORIES_URL } from '../../api'

export class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      message: ''
    }
  }

  render () {
    return (
      <article className='avenir mw6 center ph3 ph5-ns tc br2 pv6 mb5'>
        <h1 className='fw5 f2 f2-ns lh-title mt0 mb3'>Rotorua Rug Co. (Admin)</h1>
        <div className='mt3'>
          <label className='db lh-copy f5 tl'>Username</label>
          <input className='pa2 input-reset ba bg-transparent w-100'
            type='email'
            value={this.state.username}
            onChange={(e) => this.handleUsername(e.target.value.trim())} />
        </div>
        <div className='mv3'>
          <label className='db lh-copy f5 tl'>Password</label>
          <input className='pa2 input-reset ba bg-transparent w-100'
            type='password'
            value={this.state.password}
            onChange={(e) => this.handlePassword(e.target.value.trim())} />
        </div>
        <div>
          <a className='f6 mr3 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray pointer'
            onClick={this.login.bind(this)}>
            Log In
          </a>
        </div>
        <div className='lh-copy mt1'>
          <label className='f4 tc red'>{this.state.message}</label>
        </div>
      </article>
    )
  }

  componentWillMount () {
    if (window.sessionStorage.getItem('rrcToken')) {
      PUT(VALIDATE_TOKEN_URL, {})
        .then(_ => window.location.replace(ADMIN_URL + CATEGORIES_URL))
        .catch(err => console.log(err.message))
    }
  }

  handleUsername (username) {
    this.setState({ username: username })
  }

  handlePassword (password) {
    this.setState({ password: password })
  }

  login () {
    PUT(LOGIN_URL, {
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      window.sessionStorage.removeItem('rrcToken')
      window.sessionStorage.setItem('rrcToken', res.token)
      window.location.replace(ADMIN_URL + CATEGORIES_URL)
    })
    .catch(err => this.setState({ message: err.message }))
  }
}
