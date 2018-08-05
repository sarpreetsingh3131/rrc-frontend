import React from 'react'
import { GET, CATEGORIES_URL, SHOP_INFO_URL, HOME_URL } from '../../api'

export class Header extends React.Component {
  constructor () {
    super()
    this.state = {
      shopInfo: {},
      categories: []
    }
  }

  componentWillMount () {
    Promise.all([GET(SHOP_INFO_URL), GET(CATEGORIES_URL)])
      .then(response => {
        response['1'].splice(0, 0, { name: 'All' })
        this.setState({
          shopInfo: response['0'],
          categories: response['1']
        })
      }).catch(err => console.log(err))
  }

  render () {
    return (
      <header className='bg-white black-80 tc pv1 avenir'>
        <a className='link bg-animate black-80'
          href={`${process.env.PUBLIC_URL}` + HOME_URL}>
          <h1 className='mt2 mb0 baskerville i fw1 f1'>{this.state.shopInfo.name}</h1>
        </a>
        <h2 className='mt2 mb0 f6 fw4 ttu tracked'>{this.state.shopInfo.address}</h2>
        <h2 className='mt2 mb0 f6 fw4 ttu tracked'>{[this.state.shopInfo.phones].toString().split(',').join(', ')}</h2>
        <h2 className='mt2 mb0 f6 fw4 tracked'>{this.state.shopInfo.email}</h2>
        <nav className='bt bb tc mw8 center mt3'>
          {this.state.categories.map((category, index) =>
            <a key={index}
              className='f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l'
              href={`${process.env.PUBLIC_URL}` + CATEGORIES_URL + '/' +
              category.name.toLowerCase().replace(/[( )/]/g, '-') + (category._id ? '?id=' + category._id : '')}>
              {category.name}
            </a>
          )}
        </nav>
      </header>
    )
  }
}
