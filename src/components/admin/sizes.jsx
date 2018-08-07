import React from 'react'

import { PUT, GET, DELETE, POST } from '../../api'

export class Sizes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      isPopUp: false,
      size: {}
    }
  }

  render () {
    return (
        this.state.isPopUp ? this.popUp()
        : <div className='pa3 avenir'>
          <div className='overflow-auto'>
            <table className='f5 w-100 mw8 center'
              cellSpacing='0'>
              <thead>
                <tr>
                  {['Length', 'Width', 'Unit'].map((value, index) =>
                    <th key={index}
                      className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>
                      {value}
                    </th>
                  )}
                  <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white' />
                  <th className='fw6 bb b--black-20 tr pb3 pr3 bg-white'>
                    <a className='f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray pointer'
                      onClick={this.handleAddButton.bind(this)}>
                      Add
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((item, index) =>
                  <tr key={index}
                    className='overflow-auto'>
                    <td className='pv3 pr3 bb b--black-20'>{item.length}</td>
                    <td className='pv3 pr3 bb b--black-20'>{item.width}</td>
                    <td className='pv3 pr3 bb b--black-20'>{item.unit}</td>
                    <td className='pv3 pr3 bb b--black-20'>
                      <a className='f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray pointer'
                        onClick={() => this.handleEditButton(index)}>
                        Edit
                      </a>
                    </td>
                    <td className='pv3 pr3 bb b--black-20'>
                      <a className='f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray pointer'
                        onClick={() => this.delete(index)}>
                        Delete
                    </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    )
  }

  componentWillMount () {
    GET('/' + this.props.model)
      .then(items => this.setState({ items: items }))
      .catch(err => window.alert(err.message))
  }

  add () {
    POST('/' + this.props.model, this.state.size)
      .then(item => {
        let items = this.state.items
        items.splice(0, 0, item)
        this.setState({
          items: items,
          size: {},
          isPopUp: false
        })
      })
      .catch(err => window.alert(err.message))
  }

  edit () {
    PUT('/' + this.props.model, {
      ...this.state.size,
      id: this.state.size._id
    })
      .then(item => {
        let items = this.state.items
        let element = items.find((element) => { return element._id === this.state.size._id })
        items[items.indexOf(element)] = item
        this.setState({
          items: items,
          size: {},
          isPopUp: false
        })
      })
      .catch(err => window.alert(err.message))
  }

  delete (index) {
    if (window.confirm('Are you sure?')) {
      DELETE('/' + this.props.model, this.state.items[index]._id)
        .then(_ => {
          let items = this.state.items
          items.splice(index, 1)
          this.setState({ items: items })
        })
        .catch(err => window.alert(err.message))
    }
  }

  handleAddButton () {
    this.setState({
      size: {
        length: '',
        width: '',
        unit: 'm'
      },
      isPopUp: true
    })
  }

  handleEditButton (index) {
    this.setState({
      size: this.state.items[index],
      isPopUp: true
    })
  }

  handleCancelButton () {
    this.setState({
      size: {},
      isPopUp: false
    })
  }

  handleLengthAndWidth (length, width) {
    let size = {
      ...this.state.size,
      length: length,
      width: width
    }
    this.setState({size: size})
  }

  handleUnit (unit) {
    let size = {
      ...this.state.size,
      unit: unit
    }
    this.setState({size: size})
  }

  popUp () {
    return (
      <article className='avenir center mw5 mw6-ns hidden ba mv4'>
        <div className='pa3 bt'>
          <label className='f6 db mb2'>Length</label>
          <input className='input-reset ba b--black-20 pa2 mb2 db w-100'
            type='number'
            value={this.state.size.length}
            onChange={(e) => this.handleLengthAndWidth(e.target.value, this.state.size.width)} />
          <label className='f6 db mb2'>Width</label>
          <input className='input-reset ba b--black-20 pa2 mb2 db w-100'
            type='number'
            value={this.state.size.width}
            onChange={(e) => this.handleLengthAndWidth(this.state.size.length, e.target.value)} />
          <label className='f6 db mb2'>Unit</label>
          <select className='pa2 mb2'
            value={this.state.size.unit}
            onChange={e => this.handleUnit(e.target.value)}>
            <option>cm</option>
            <option>m</option>
          </select>
          <div className='tc'>
            <a className='f6 mr3 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray pointer'
              onClick={this.state.size._id ? this.edit.bind(this) : this.add.bind(this)}>
              Ok
            </a>
            <a className='f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray pointer'
              onClick={this.handleCancelButton.bind(this)}>
              Cancel
            </a>
          </div>
        </div>
      </article >
    )
  }
}
