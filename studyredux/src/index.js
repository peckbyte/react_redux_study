import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import reducer from './reducer'
import AuthRouter from './component/authRouter/authRouter'
import './config'

import Login from './container/login/login'
import Register from './container/register/register'
import Bossinfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import './index.css'

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRouter></AuthRouter>
                    <Switch>
                        <Route path='/login' key='/login' component={Login}/>
                        <Route path='/register' key='/register' component={Register}/>
                        <Route path='/bossinfo' key='/bossinfo' component={Bossinfo}/>
                        <Route path='/geniusinfo' key='/geniusinfo' component={Geniusinfo}/>
                        <Route component={Dashboard}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)

