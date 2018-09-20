import React from 'react'
import {List, Button, InputItem, WhiteSpace, WingBlank, Radio} from 'antd-mobile'
import LogoItem from '../logo.png'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../../component/logo/logo.css'
import hocForm from '../../component/commonForm/hocForm'
import {register} from '../../redux/user/user.redux';
const RadioItem = Radio.RadioItem

@connect(
    state => state.user,
    { register }
)


    @hocForm
class Register extends React.Component {


    constructor(props) {
        super(props)
        //this.radioOnChange= this.radioOnChange.bind(this)
    }


   componentWillMount(){
        this.props.handleChange('role','genius')
   }

    onRegister = () => {
        this.props.register(this.props.state)
    }

    render() {
        console.log(this.props)
        // const role = 'boss'
        // const rols = [
        //     {label: '老板', role: 'boss'},
        //     {label: '牛人', role: 'genius'}
        // ]
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
                        <InputItem onChange={value => this.props.handleChange('user',value)} >用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder='***' onChange={value => this.props.handleChange('psw',value)} >
                            密码
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder='***' onChange={value => this.props.handleChange('repeatpsw',value)}>
                            密码
                        </InputItem>
                    </List>
                    <List renderHeader='我是：'>
                        {this.props.state?(
                            <div>
                            <RadioItem
                                checked={this.props.state.role=='genius'}
                                onChange={()=>this.props.handleChange('role','genius')}
                            >
                                牛人
                            </RadioItem>
                            <RadioItem
                            checked={this.props.state.role=='boss'}
                            onChange={()=>this.props.handleChange('role','boss')}
                            >
                            BOSS
                            </RadioItem>
                            </div>):null}
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