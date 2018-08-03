import React from 'react'
import { GET, PRODUCTS_URL, HOST } from '../../api'

export class Product extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      product: {
        images: []
      },
      currentImage: ''
    }
    this.properties = [
      'Category',
      'Color',
      'Price',
      'Shape',
      'Size',
      'Style',
      'Views',
      'Weave'
    ]
  }

  componentDidMount () {
    GET(PRODUCTS_URL + '/' + this.props.match.params.id)
      .then(product => {
        console.log(product)
        this.setState({
          product: product,
          currentImage: product.images[0]
        })
      })
      .catch(err => console.log(err))
  }

  changeImage (image) {
    this.setState({ currentImage: image })
  }

  render () {
    console.log(this.state.product)
    return (
      <main className='w-100 cf avenir dark-gray bg-white pa3 pa4-m pa8-l mw8 center'>
        <article className='b--black-10 db pv4 ph3 ph0-l no-underline black'>
          <div className='flex flex-column flex-row-ns'>
            <div className='pr1-ns mb4 mb0-ns w-100 w-50-ns'>
              <img src={HOST + this.state.currentImage}
                className='db'
                alt='' />
              <div className='pa1 tc'>
                <a className='pointer'>
                  {this.state.product.images.map((image, index) =>
                    <img onClick={() => this.changeImage(image)}
                      key={index}
                      src={HOST + image}
                      className='br4 h3 w3 dib pa1'
                      alt='' />
                  )}
                </a>
              </div>
            </div>
            <div className='w-100 w-50-ns pl5-ns'>
              <h1 className='f3 fw5 avenir mt0 lh-title'>{this.state.product.name}</h1>
              <p className='f5 f5-l lh-copy'>{this.state.product.description}</p>
              <article className='bg-light-gray pa2 pa2-ns avenir' data-name='slab-stat-small'>
                <div className='cf'>
                  {this.properties.map((property, index) =>
                    <dl key={index}
                      className='fl fn-l w-50 dib-l w-auto-l lh-title mr5-l'>
                      <dd className='f5 fw4 ml0'>{property}</dd>
                      <dd className='f5 fw5 ml0'>{this.propertyValue(property.toLowerCase())}</dd>
                    </dl>
                  )}
                </div>
              </article>
            </div>
          </div>
        </article>
      </main>
    )
  }

  propertyValue (property) {
    switch (property) {
      case 'size': return this.state.product.size
        ? this.state.product.size.length + ' x ' + this.state.product.size.width
        : 'NA'
      case 'price': return '$' + this.state.product.price
      case 'views': return this.state.product.views
      default: return this.state.product[property] ? this.state.product[property].name : 'NA'
    }
  }
}
