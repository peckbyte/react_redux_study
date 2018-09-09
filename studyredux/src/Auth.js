import React from 'react'
import { Redirect } from 'react-router-dom'
import {  logout, login } from './Auth.rudex'
import { connect } from 'react-redux'
@connect(
    state => state.auth,
    { login, logout }
)


export class Auth extends React.Component{
    constructor(props){
        super(props)
         this.state={
            num:{}
        }
    }


    // constructor(props) {
    //     super(props)
    // }

    render() {
        // console.log(this.props.isAuth)
        return (
            <div>
                {this.props.isAuth?<Redirect to = '/dashboard' />:null}
                <div>您没有登录，没有权限查看</div>
                <div>{this.state.num.name}</div>
                <button onClick={this.props.login}>点击登录</button>
            </div>
    )
    }
    }