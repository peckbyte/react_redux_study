import React from 'react'
import {List, Button, InputItem, WhiteSpace, WingBlank, Radio} from 'antd-mobile'
import LogoItem from './logo.png'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../component/logo/logo.css'
import {register} from "../redux/user/user.redux";
const RadioItem = Radio.RadioItem

@connect(
    state => state.user,
    { register }
)

class Register extends React.Component {
    state = {
        user:'',
        psw:'',
        repeatpsw:'',
        role: 'boss',
    }

    constructor(props) {
        super(props)
        //this.radioOnChange= this.radioOnChange.bind(this)
    }

     radioOnChange = (role) => {
        this.setState({
            role,
        })
    }

    handleChange = (key,value) => {
        this.setState(
            {
                [key]:value,
            }
        )
    }

    onRegister = () => {
        this.props.register(this.state)
    }

    render() {
        const {role} = this.state
        const rols = [
            {label: '老板', role: 'boss'},
            {label: '牛人', role: 'genius'}
        ]
        return (
            <div>
                {
                    this.props.redirect?(<Redirect to={this.props.redirect} />):null
                }
                <div className='logoContainer'>
                    <img src={LogoItem} alt=""/>
                </div>
                <WingBlank>
                    <List renderHeader='请输入注册信息'>
                        {this.props.msg?<p>{this.props.msg}</p>:null}
                        <InputItem onChange={value => this.handleChange('user',value)} >用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder='***' onChange={value => this.handleChange('psw',value)} >
                            密码
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder='***' onChange={value => this.handleChange('repeatpsw',value)}>
                            密码
                        </InputItem>
                    </List>
                    <List renderHeader='我是：'>
                        {
                            rols.map(i => (
                                <RadioItem key={i.role} checked={role === i.role}
                                           onChange={() => this.radioOnChange(i.role)}>
                                    {i.label}
                                </RadioItem>
                            ))
                        }
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick = {()=>this.onRegister()}>
                        注册
                    </Button>
                </WingBlank>

            </div>
        )
    }
}

export default Register