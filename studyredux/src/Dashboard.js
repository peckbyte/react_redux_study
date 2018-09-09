import React from 'react'
import { connect } from 'react-redux'
import { logout } from './Auth.rudex'
import Counter from './App'
import { Link, Route, Redirect } from 'react-router-dom'

const B = () => (<div>呼吸内科</div>)
const  N= () => (<div>神经内科</div>)

@connect(
    state => state.auth,
    {logout}
)

export class Dashboard extends React.Component{
    render() {
        const { match } = this.props
        const RedirectToLogin = <Redirect to='/login' />
        const App = (
            <div>
                <ul>
                    <button onClick={this.props.logout}>退出</button>
                    <li><Link to={`${match.url}`}>计数器</Link></li>
                    <li><Link to={`${match.url}/b`}>呼吸内科</Link></li>
                    <li><Link to={`${match.url}/n`}>神经内科</Link></li>
                </ul>
                <Route path={`${match.url}/`} exact component={Counter}/>
                <Route path={`${match.url}/b`} component={B}/>
                <Route path={`${match.url}/n`} component={N}/>
                <Redirect to={`${match.url}`}/>
            </div>
        )
        return this.props.isAuth?App:RedirectToLogin
    }
}