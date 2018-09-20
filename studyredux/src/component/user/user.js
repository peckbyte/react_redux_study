import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import browsercookies from 'browser-cookies'
import {logout} from "../../redux/user/user.redux";

@connect(
    state => state.user,
    {logout}
)
class User extends Component {
    constructor(props) {
        super(props)
        this.loginOut = this.loginOut.bind(this)
    }

    loginOut() {
        const alert = Modal.alert
        console.log('loginOut')
        alert('注销', '确定退出登录吗', [
            {text: '取消', onPress: () => console.log('取消')},
            {
                text: '确定', onPress: () => {
                    browsercookies.erase('userid')
                    this.props.logout()
                }
            }
        ])

    }

    render() {


        const {Item} = List
        console.log(this.props)
        const {user} = this.props
        return (
            user ? (<div>
                <Result

                    img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: 50}} alt=""/>}
                    title={this.props.user}
                    message={this.props.role == 'boss' ? (this.props.company) : null}
                />
                <List
                    renderHeader={() => '简绍'}
                >
                    <Item
                        mulpleline='true'
                    >
                        {this.props.job}
                        {this.props.need.split('\n').map(v => (<Item.Brief key={v}>{v}</Item.Brief>))}
                        {this.props.salary ? (<div>{`薪资：${this.props.salary}`}</div>) : null}
                    </Item>
                </List>
                <WhiteSpace/>

                <List>
                    <Item onClick={this.loginOut}>
                        退出登录
                    </Item>
                </List>
            </div>) : <Redirect to={this.props.redirect} />


        )
    }
}

export default User