import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'tachyons/css/tachyons.min.css'
import './assets/css/style.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
