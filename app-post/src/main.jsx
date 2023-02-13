import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHeart, faPaperPlane, faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { faComment, faSun, faMoon, faSquareMinus } from '@fortawesome/free-regular-svg-icons'
import { Provider } from 'react-redux'
import store from './app/store'

library.add(faUser, faHeart, faComment, faSun, faMoon, faPaperPlane, faLeftLong, faSquareMinus)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
