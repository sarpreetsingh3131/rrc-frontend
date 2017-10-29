import React from 'react'

export class Rugs extends React.Component {
  constructor () {
    super()
    this.state = {
      heading: 'All Rugs',
      rugs: []
    }
  }

  componentWillMount () {
    let arr = []
    for (let i = 0; i < 20; i++) {
      arr.push({
        img: 'https://i.pinimg.com/736x/43/11/8e/43118e6055eb4c6a287820f7ae971410--afghan-rugs-oriental.jpg',
        title: 'Afghan Rug',
        size: '150 x 220',
        price: '$349.00'
      })
    }
    this.setState({ rugs: arr })
  }

  render () {
    return (
      <article>
        <h2 className='f3 fw4 pa3 mv0'>{this.state.heading}</h2>
        <div className='cf pa2'>
          {this.state.rugs.map((rug, index) =>
            <div key={index} className='fl w-50 w-25-m w-20-l pa2'>
              <a className='db link grow aspect-ratio--0x0.1 tc'>
                <img src={rug.img} className='w-100 db outline black-10' alt={rug.title} />
                <dl className='mt2 f6 lh-copy'>
                  <dt className='clip'>Title</dt>
                  <dd className='ml0 black truncate w-100'>{rug.title}</dd>
                  <dt className='clip'>Size</dt>
                  <dd className='ml0 gray truncate w-100'>{rug.size}</dd>
                  <dt className='clip'>Price</dt>
                  <dd className='ml0 gray truncate w-100'>{rug.price}</dd>
                </dl>
              </a>
            </div>)}
        </div>
        <div className='flex items-center justify-center pa4'>
          <a href='' className='f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4'>
            <svg className='w1' data-icon='chevronLeft' viewBox='0 0 32 32' style={{ fill: 'currentcolor' }}>
              <title>chevronLeft icon</title>
              <path d='M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z' />
            </svg>
            <span className='pl1'>Previous</span>
          </a>
          <a href='' className='f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box'>
            <span className='pr1'>Next</span>
            <svg className='w1' data-icon='chevronRight' viewBox='0 0 32 32' style={{ fill: 'currentcolor' }}>
              <title>chevronRight icon</title>
              <path d='M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z' />
            </svg>
          </a>
        </div>
      </article>
    )
  }
}
