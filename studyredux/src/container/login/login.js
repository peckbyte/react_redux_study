import React from 'react'
import {List, Button, InputItem, WhiteSpace, WingBlank} from 'antd-mobile'
import { Route, Redirect } from 'react-router-dom'
import LogoItem from '../logo.png'
import { connect } from 'react-redux'
import { user } from "../../redux/user/user.redux";
import {login} from "../../redux/user/user.redux";
import '../../component/logo/logo.css'
import hocForm from '../../component/commonForm/hocForm'
@connect(
    state => state.user,
    {login}
)

    @hocForm
class Login extends React.Component {
    constructor(props){
        super(props)

        this.register = this.register.bind(this)
        this.onLogin=this.onLogin.bind(this)
    }

    register(){
        this.props.history.push('/register')
    }



    onLogin() {
        this.props.login(this.props.state)
    }
    render() {
        return (
            <div>
                {this.props.redirect?(<Redirect to={this.props.redirect} />):null }
                <div className='logoContainer'><img src={LogoItem} alt=""/></div>
                <WingBlank sz='lg'>
                    <List>
                        { this.props.msg?(<p>{this.props.msg}</p>):null }
                        <InputItem onChange={v => this.props.handleChange('user',v)}>用户名</InputItem>
                        <WhiteSpace sz='lg'/>
                        <InputItem type="password" placeholder="****"
                        onChange = {v => this.props.handleChange('psw',v)}
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