import React from 'react'
import {List, Button, InputItem, WhiteSpace, WingBlank} from 'antd-mobile'
import { Route, Redirect } from 'react-router-dom'
import AuthRouter from '../component/authRouter/authRouter'
import LogoItem from './logo.png'
import { connect } from 'react-redux'
import { user } from "../redux/user/user.redux";
import {login} from "../redux/user/user.redux";
import '../component/logo/logo.css'

@connect(
    state => state.user,
    {login}
)

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user:'',
            psw:'',
        }
        this.register = this.register.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onLogin=this.onLogin.bind(this)
    }
    register(){
        this.props.history.push('/register')
    }

    onChange(key,v) {
        this.setState({
            [key]:v
        })
    }

    onLogin() {
        this.props.login(this.state)
    }
    render() {
        return (
            <div>
                {this.props.redirect?(<Redirect to={this.props.redirect} />):null }
                <AuthRouter />
                <div className='logoContainer'><img src={LogoItem} alt=""/></div>
                <WingBlank sz='lg'>
                    <List>
                        { this.props.msg?(<p>{this.props.msg}</p>):null }
                        <InputItem onChange={v => this.onChange('user',v)}>用户名</InputItem>
                        <WhiteSpace sz='lg'/>
                        <InputItem type="password" placeholder="****"
                        onChange = {v => this.onChange('psw',v)}
                        >密码</InputItem>
                    </List>
                </WingBlank>
                <WhiteSpace />
                <WingBlank>
                    <Button type='primary' onClick={this.onLogin}>登录</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )

    }

}

export default Login