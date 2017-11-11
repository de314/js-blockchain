import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import 'react-select/dist/react-select.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
