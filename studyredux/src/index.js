import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { counter, removeDATA, addDATA, addDATAasync } from './index.redux'
const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))


function render() {
    ReactDom.render(<App store={store} removeDATA={removeDATA} addDATA={addDATA} addDATAasync={addDATAasync}></App>,document.getElementById('root'))
}

render()

store.subscribe(render)