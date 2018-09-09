import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
// import { counter }  from './index.redux'
import { Auth } from './Auth'
import reduxs from './reduxs'
import { Dashboard } from './Dashboard'
import './config'
import 'antd-mobile/dist/antd-mobile.css'
const store = createStore(reduxs,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

console.log(store)

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path='/login' exact component={Auth}/>
                    <Route path='/dashboard'  component={Dashboard}/>
                    <Redirect to='/dashboard' />
                </Switch>
            </BrowserRouter>
        </Provider>
    ),
        document.getElementById('root')
)

