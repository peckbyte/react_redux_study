import React from 'react'
import {List, Button, InputItem, WhiteSpace, WingBlank} from 'antd-mobile'
import { Route } from 'react-router-dom'
import AuthRouter from '../component/authRouter/authRouter'
import LogoItem from './logo.png'
import '../component/logo/logo.css'

class Login extends React.Component {
    constructor(props){
        super(props)
        this.register = this.register.bind(this)
    }
    register(){
        this.props.history.push('/register')
    }
    render() {
        return (
            <div>
                <AuthRouter />
                <div className='logoContainer'><img src={LogoItem} alt=""/></div>
                <WingBlank sz='lg'>
                    <List>
                        <InputItem>用户名</InputItem>
                        <WhiteSpace sz='lg'/>
                        <InputItem type="password" placeholder="****">密码</InputItem>
                    </List>
                </WingBlank>
                <WhiteSpace />
                <WingBlank>
                    <Button type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )

    }

}

export default Login