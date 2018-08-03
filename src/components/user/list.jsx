import React from 'react'

import { HOST, GET, PRODUCTS_URL } from '../../api'

export class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: []
    }
    this.url = PRODUCTS_URL + props.location.search.replace('id', 'category')
  }

  render () {
    return (
      <main className='w-100 cf avenir dark-gray bg-white pa3 pa4-m pa5-l mw8 center'>
        <article>
          <div className='cf pa2'>
            {this.state.products.map((product, index) =>
              <div key={index}
                className='fl w-50 w-25-m w-30-l pa2'>
                <a href={PRODUCTS_URL + '/' + product._id}
                  className='db link tc' >
                  <img src={HOST + product.images[0]}
                    className='w-100 db outline black-10 grow aspect-ratio--0x0.1 tc'
                    alt='' />
                  <dl className='mt2 f6 lh-copy'>
                    <dd className='ml0 black truncate w-100'>{product.name}</dd>
                    <dd className='ml0 gray truncate w-100'>
                      {product.size ? product.size.length + ' x ' + product.size.width : ''}
                    </dd>
                    <dd className='ml0 gray truncate w-100'>{'$' + product.price}</dd>
                  </dl>
                </a>
              </div>
            )}
          </div>
        </article>
      </main>
    )
  }

  componentWillMount () {
    GET(this.url)
      .then(products => this.setState({ products: products }))
      .catch(err => console.log(err))
  }
}
