import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'


import reduxs from './reduxs'
import './config'
import 'antd-mobile/dist/antd-mobile.css'
const store = createStore(reduxs,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))


ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
            </BrowserRouter>
        </Provider>
    ),
        document.getElementById('root')
)

