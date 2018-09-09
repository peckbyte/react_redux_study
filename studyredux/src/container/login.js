import React from 'react'
import { List, Button, InputItem, WhiteSpace} from 'antd-mobile'
import LogoItem from './logo.png'
import '../component/logo/logo.css'
const Item = List.Item
class Login extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        return(
            <div>
                <div className='logoContainer'><img src={LogoItem} alt=""/></div>
                <List>
                    <InputItem>用户名</InputItem>
                    <WhiteSpace />
                    <InputItem>密码</InputItem>
                </List>
                <Button>登录</Button>
                <div>登录页面</div>
            </div>
        )

    }

}

export default Login