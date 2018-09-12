import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
 import reducer from './reducer'
 import './config'
// import 'antd-mobile/dist/antd-mobile.css'

import Login from './container/login'
import Register from './container/register'
const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component = {Login} />
                    <Route path='/register' component={Register} />
                </Switch>
            </BrowserRouter>
        </Provider>
    ),
        document.getElementById('root')
)

