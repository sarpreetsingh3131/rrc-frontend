import React from 'react'

import { PUT, GET, DELETE, POST, VALIDATE_TOKEN_URL, ADMIN_URL } from '../../api'
import { Sizes } from './sizes'
import { Products } from './products'
import { ShopInfo } from './shop-info'

const MODELS = [
  'Categories',
  'Colors',
  'Products',
  'Shapes',
  'Sizes',
  'Styles',
  'Shop-Info',
  'Weaves'
]

export class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  render () {
    return (
      <div>
        <header className='bg-white black-80 tc pv1 avenir'>
          <h1 className='fw5 f2 f2-ns lh-title mt0 mb3 mt2'>Rotorua Rug Co. (Admin)</h1>
          <a className='f5 grow br-pill ba bw1 ph3 pv2 mb2 dib pointer'
            onClick={this.logout.bind(this)}>
              Log Out
          </a>
          <nav className='bt bb tc mw9 center mt3'>
            {MODELS.map((model, index) =>
              <a key={index} className='f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l pointer'
                href={`${process.env.PUBLIC_URL}` + ADMIN_URL + '/' + model.toLowerCase()} >
                {model}
              </a>
            )}
          </nav>
        </header>
        {this.content()}
      </div>
    )
  }

  componentWillMount () {
    PUT(VALIDATE_TOKEN_URL, {})
    .then(_ => { })
    .catch(_ => window.location.replace(`${process.env.PUBLIC_URL}` + ADMIN_URL))
  }

  componentDidMount () {
    GET('/' + this.props.model)
    .then(items => this.setState({ items: items }))
    .catch(err => window.alert(err.message))
  }

  add () {
    let name = window.prompt('Provide name', '')
    if (name !== null && name) {
      POST('/' + this.props.model, { name: name })
      .then(item => {
        let items = this.state.items
        items.splice(0, 0, item)
        this.setState({ items: items })
      })
      .catch(err => window.alert(err.message))
    }
  }

  edit (index) {
    let name = window.prompt('Edit name', this.state.items[index].name)
    if (name !== null && name) {
      PUT('/' + this.props.model, {
        name: name,
        id: this.state.items[index]._id
      })
      .then(item => {
        let items = this.state.items
        items[index] = item
        this.setState({ items: items })
      })
      .catch(err => window.alert(err.message))
    }
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

  logout () {
    window.sessionStorage.removeItem('rrcToken')
    window.location.replace(`${process.env.PUBLIC_URL}` + ADMIN_URL)
  }

  content () {
    switch (this.props.model) {
      case 'categories':
      case 'colors':
      case 'shapes':
      case 'styles':
      case 'weaves': return this.table()
      case 'sizes': return <Sizes model={this.props.model} />
      case 'products': return <Products model={this.props.model} />
      case 'shop-info': return <ShopInfo model={this.props.model} />
      default: return null
    }
  }

  table () {
    return (
      <div className='pa4 avenir'>
        <div className='overflow-auto'>
          <table className='f5 w-100 mw8 center'
            cellSpacing='0'>
            <thead>
              <tr>
                <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Name</th>
                <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white' />
                <th className='fw6 bb b--black-20 tr pb3 pr3 bg-white'>
                  <a className='f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray pointer'
                    onClick={this.add.bind(this)}>
                    Add
                  </a>
                </th>
              </tr>
            </thead>
            <tbody className='lh-copy'>
              {this.state.items.map((item, index) =>
                <tr key={index}>
                  <td className='pv3 pr3 bb b--black-20'>{item.name}</td>
                  <td className='pv3 pr3 bb b--black-20'>
                    <a className='f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray pointer'
                      onClick={() => this.edit(index)}>
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
}
