import React from 'react'
import {List, Button, InputItem, WhiteSpace, WingBlank, Radio} from 'antd-mobile'
import LogoItem from './logo.png'
import '../component/logo/logo.css'

const RadioItem = Radio.RadioItem

class Register extends React.Component {
    state = {
        role: 0,
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

    render() {
        const {role} = this.state
        const rols = [
            {label: '老板', role: 0},
            {label: '牛人', role: 1}
        ]
        return (
            <div>
                <div className='logoContainer'>
                    <img src={LogoItem} alt=""/>
                </div>
                <WingBlank>
                    <List renderHeader='请输入注册信息'>
                        <InputItem>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder='***'>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder='***'>密码</InputItem>
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
                    <Button type='primary'>注册</Button>
                </WingBlank>

            </div>


        )

    }

}

export default Register