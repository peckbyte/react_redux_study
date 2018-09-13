import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
 import reducer from './reducer'
import AuthRouter from './component/authRouter/authRouter'
 import './config'
// import 'antd-mobile/dist/antd-mobile.css'

import Login from './container/login/login'
import Register from './container/register/register'
import Bossinfo from './container/bossinfo/bossinfo'
const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRouter></AuthRouter>
                    <Route path='/login' component = {Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/bossinfo' component={Bossinfo} />
                </div>
            </BrowserRouter>
        </Provider>
    ),
        document.getElementById('root')
)

