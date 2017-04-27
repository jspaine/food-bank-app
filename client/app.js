import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import createHistory from 'history/createBrowserHistory'

import createStore from './store'
import {setUser} from './modules/users/auth-reducer'
import {loadMedia} from './modules/media/media-reducer'
import {loadSettings} from './modules/settings/settings-reducer'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/skin-blue.min.css'

import './application.css'
import './modules/core/css/core.css'

import Router from './Router'

//disable redbox
delete AppContainer.prototype.unstable_handleError

const history = createHistory({})
const store = createStore(history)

const root = document.getElementById('app')

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component history={history} />
      </Provider>
    </AppContainer>,
    root
  )
}

if (module.hot) {
  module.hot.accept('./Router', () => {
    const Next = require('./Router').default
    render(Next)
  })
}


store.dispatch(loadMedia())
store.dispatch(loadSettings())

fetch('/api/users/me', {credentials: 'same-origin'})
  .then(res =>
    res.json().then(user => {
      store.dispatch(setUser(user))
      render(Router)
    }))
