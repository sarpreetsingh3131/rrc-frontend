import React from 'react'
import { Header } from './components/header'
import { Rugs } from './components/rugs'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <main className="w-100 cf helvetica dark-gray bg-white pa3 pa4-m pa5-l mw9 center">
          <Rugs /> 
        </main>
      </div>
    )
  }
}
