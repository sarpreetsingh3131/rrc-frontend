import React from 'react'

import {
  PUT, GET, DELETE, POST, HOST, PRODUCTS_URL, CATEGORIES_URL, SHAPES_URL, SIZES_URL, COLORS_URL, STYLES_URL, WEAVES_URL
} from '../../api'

export class Products extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      isPopUp: false,
      product: {},
      optionalProperties: []
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
                  <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Name</th>
                  <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white'>Image</th>
                  <th className='fw6 bb b--black-20 tl pb3 pr3 bg-white' />
                  <th className='fw6 bb b--black-20 tr pb3 pr3 bg-white'>
                    <a className='f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray pointer'
                      onClick={this.handleAddButton.bind(this)}>
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
                      <img src={HOST + item.images[0]}
                        className='br4 h4 w4 dib pa2'
                        alt='' />
                    </td>
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
    Promise.all([
      GET(PRODUCTS_URL),
      GET(CATEGORIES_URL),
      GET(SHAPES_URL),
      GET(SIZES_URL),
      GET(COLORS_URL),
      GET(STYLES_URL),
      GET(WEAVES_URL)
    ])
      .then(res => this.setState({
        items: res[0],
        optionalProperties: [
          {
            name: 'Category',
            items: res[1]
          },
          {
            name: 'Shape',
            items: res[2]
          },
          {
            name: 'Size',
            items: res[3]
          },
          {
            name: 'Color',
            items: res[4]
          },
          {
            name: 'Style',
            items: res[5]
          },
          {
            name: 'Weave',
            items: res[6]
          }
        ]
      }))
      .catch(err => window.alert(err.message))
  }

  add () {
    POST('/' + this.props.model, this.modifyProduct())
      .then(item => {
        let items = this.state.items
        items.splice(0, 0, item)
        this.setState({
          items: items,
          product: {},
          isPopUp: false
        })
      })
      .catch(err => window.alert(err.message))
  }

  edit () {
    PUT('/' + this.props.model, this.modifyProduct())
      .then(item => {
        let items = this.state.items
        let element = items.find((element) => { return element._id === this.state.product._id })
        items[items.indexOf(element)] = item
        this.setState({
          items: items,
          product: {},
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
      product: {
        name: '',
        price: '',
        description: '',
        images: []
      },
      isPopUp: true
    })
  }

  handleEditButton (index) {
    this.setState({
      product: this.state.items[index],
      isPopUp: true
    })
  }

  handleCancelButton () {
    this.setState({
      product: {},
      isPopUp: false
    })
  }

  handleProperty (label, value) {
    let product = this.state.product
    product[label] = value
    this.setState({ product: product })
  }

  handleImageUpload (image) {
    let fileReader = new window.FileReader()
    fileReader.onloadend = () => {
      let product = this.state.product
      product.images.push({
        name: image.name,
        size: image.size,
        data: fileReader.result
      })
      this.setState({ product: product })
    }
    fileReader.readAsDataURL(image)
  }

  handleImageDelete (index) {
    let product = this.state.product
    product.images.splice(index, 1)
    this.setState({ product: product })
  }

  valueForDropDown (label) {
    let property = this.state.product[label]
    if (property) {
      switch (label) {
        case 'size': return property.length + ' x ' + property.width
        default: return property.name
      }
    }
    return 'NA'
  }

  dropDown () {
    return (
      <div className='cf'>
        {this.state.optionalProperties.map((property, index) =>
          <dl key={index}
            className='fl fn-l w-60 dib-l w-auto-l mr3-l'>
            <dd>{property.name}</dd>
            <dd className='normal black-60'>(optional)</dd>
            <dd>
              <select value={this.valueForDropDown(property.name.toLowerCase())}
                onChange={e =>
                this.handleProperty(property.name.toLowerCase(), e.target.selectedIndex === 0
                ? null : property.items[e.target.selectedIndex - 1])}>
                <option>NA</option>
                {property.items.map((item, index) =>
                  <option key={index}>{item.name || (item.length + ' x ' + item.width)}</option>
                )}
              </select>
            </dd>
          </dl>
        )}
      </div>
    )
  }

  modifyProduct () {
    let product = this.state.product
    if (product._id) { product.id = product._id }
    if (product.category) { product.category = product.category._id }
    if (product.shape) { product.shape = product.shape._id }
    if (product.size) { product.size = product.size._id }
    if (product.color) { product.color = product.color._id }
    if (product.style) { product.style = product.style._id }
    if (product.weave) { product.weave = product.weave._id }
    return product
  }

  popUp () {
    return (
      <article className='avenir center mw5 mw7-ns hidden ba mv4'>
        <div className='pa3 bt'>
          <label className='f6 db mb2'>Name</label>
          <input className='input-reset ba b--black-20 pa2 mb2 db w-100'
            type='text'
            value={this.state.product.name}
            onChange={e => this.handleProperty('name', e.target.value)} />
          <label className='f6 db mb2'>Price</label>
          <input className='input-reset ba b--black-20 pa2 mb2 db w-100'
            type='number'
            value={this.state.product.price}
            onChange={e => this.handleProperty('price', e.target.value)} />
          <label className='f6 db mb2'>Description</label>
          <textarea className='db border-box hover-black w-100 ba b--black-20 pa2 br2 h4 mb2'
            value={this.state.product.description}
            onChange={e => this.handleProperty('description', e.target.value)} />
          <label className='f6 db mb2'>Images</label>
          <input type='file'
            accept='image/*'
            onChange={e => this.handleImageUpload(e.target.files[0])} />
          <div className='cf'>
            {this.state.product.images.map((image, index) =>
              <dl key={index}
                className='fl fn-l w-60 dib-l w-auto-l mr2-l'>
                <dd className='ml0'>
                  <img src={image.data || HOST + image}
                    className='br4 h4 w4 dib pa2'
                    alt='avatar' />
                </dd>
                <dd className='ml0'>
                  <a className='f6 mr5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray pointer'
                    onClick={() => this.handleImageDelete(index)}>
                    Delete
                  </a>
                </dd>
              </dl>
            )}
          </div>
          {this.dropDown()}
          <div className='tr'>
            <a className='f6 mr3 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray pointer'
              onClick={this.state.product._id ? this.edit.bind(this) : this.add.bind(this)}>
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
