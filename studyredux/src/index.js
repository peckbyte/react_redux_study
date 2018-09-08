import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Link, Route, Redirect, Switch } from 'react-router-dom'
import { counter } from './index.redux'
const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

const B = () => (<h2>呼吸内科</h2>)
const N = () => (<h2>神经内科</h2>)

class Test extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return(
            <h1>组件测试</h1>
        )
    }
}

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <h1>江西省人民医院</h1>
                    <ul><Link to='/'>心内科</Link></ul>
                    <ul><Link to='/breath'>呼吸内科</Link></ul>
                    <ul><Link to='/n'>神经内科</Link></ul>

                    {/*<Redirect to='/n' />*/}
                    <Switch>
                    <Route path='/' exact component={App}/>
                    <Route path='/breath'  component={B}/>
                    <Route path='/n'  component={N}/>
                    <Route path='/:location'  component={Test}/>
                    </Switch>

                </div>
            </BrowserRouter>
        </Provider>
    ),
        document.getElementById('root')
)

