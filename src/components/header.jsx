import React from 'react'

export class Header extends React.Component {
  render () {
    return (
      <header className='bg-white black-80 tc pv4 avenir'>
        <h1 className='mt2 mb0 baskerville i fw1 f1'>Rotorua Rug Co.</h1>
        <h2 className='mt2 mb0 f6 fw4 ttu tracked'>1300 Amohia Street, Rotorua, New Zealand</h2>
        <h2 className='mt2 mb0 f6 fw4 ttu tracked'>0210263313, 021292392323, 071921839183</h2>
        <h2 className='mt2 mb0 f6 fw4 tracked'>orientalrugs@xtra.co.nz</h2>
        <nav className='bt bb tc mw8 center mt4'>
          <a className='f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l'>All Rugs</a>
          <a className='f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l'>Persian & Oriental</a>
          <a className='f6 f5-l link bg-animate black-80 hover-bg-light-blue dib pa3 ph4-l'>Hand Knotted</a>
          <a className='f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l'>Machine Made</a>
          <a className='f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l'>Afghan</a>
        </nav>
      </header>
    )
  }
}
