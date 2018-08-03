import React from 'react'

import { PUT, GET } from '../../api'

export class ShopInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      info: {
        name: '',
        address: '',
        phones: [],
        email: '',
        id: ''
      },
      isEditing: false
    }
  }

  render () {
    return (
      <article className='avenir mw6 center ph3 ph3-ns tc br2 pv3 mb5'>
        <div className='mt3'>
          <label className='db lh-copy f5 tl'>Name</label>
          <input className='pa2 input-reset ba bg-transparent w-100'
            type='text'
            value={this.state.info.name}
            onChange={e => this.handleName(e.target.value)}
            disabled={!this.state.isEditing} />
        </div>
        <div className='mv3'>
          <label className='db lh-copy f5 tl'>Email</label>
          <input className='pa2 input-reset ba bg-transparent w-100'
            type='email'
            value={this.state.info.email}
            onChange={e => this.handleEmail(e.target.value)}
            disabled={!this.state.isEditing} />
        </div>
        <div className='mv3'>
          <label className='db lh-copy f5 tl'>Address</label>
          <input className='pa2 input-reset ba bg-transparent w-100'
            type='text'
            value={this.state.info.address}
            onChange={e => this.handleAddress(e.target.value)}
            disabled={!this.state.isEditing} />
        </div>
        {this.state.info.phones.map((phone, index) =>
          <div key={index} className='mv3'>
            <label className='db lh-copy f5 tl'>Phone{' ' + (index + 1)}</label>
            <input className='pa2 input-reset ba bg-transparent w-100'
              type='text'
              value={phone}
              onChange={e => this.handlePhone(e.target.value, index)}
              disabled={!this.state.isEditing} />
          </div>
        )}
        <div>
          <a className='f6 mr3 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray pointer'
            onClick={this.handleIsEditing.bind(this)}>
            {this.state.isEditing ? 'Save' : 'Edit'}
          </a>
        </div>
      </article>
    )
  }

  componentWillMount () {
    GET('/' + this.props.model)
      .then(info => this.setState({ info: {
        ...info,
        id: info._id
      } }))
      .catch(err => window.alert(err.message))
  }

  edit () {
    PUT('/' + this.props.model, this.state.info)
      .then(info => this.setState({
        info: info,
        isEditing: false
      }))
      .catch(err => window.alert(err.message))
  }

  handleName (name) {
    this.setState({info: {
      ...this.state.info,
      name: name
    }})
  }

  handleEmail (email) {
    this.setState({info: {
      ...this.state.info,
      email: email
    }})
  }

  handleAddress (address) {
    this.setState({info: {
      ...this.state.info,
      address: address
    }})
  }

  handleIsEditing () {
    this.state.isEditing ? this.edit() : this.setState({ isEditing: !this.state.isEditing })
  }

  handlePhone (phone, index) {
    let phones = this.state.info.phones
    phones[index] = phone
    this.setState({info: {
      ...this.state.info,
      phones: phones
    }})
  }
}
