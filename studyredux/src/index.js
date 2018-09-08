import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import { counter, removeDATA, addDATA } from './index.redux'

const store = createStore(counter)

function render() {
    ReactDom.render(<App store={store} removeDATA={removeDATA} addDATA={addDATA} ></App>,document.getElementById('root'))
}

render()

store.subscribe(render)