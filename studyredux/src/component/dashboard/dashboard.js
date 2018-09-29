import React,{Component} from 'react'
import { Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import Msg from '../msg/msg'
import User from '../user/user'
import NavLink from '../navlink/navlink'
import { NavBar } from 'antd-mobile'
import {getChatList, sendMsg, recvMsg} from "../../redux/user/chat.redux";

@connect(state=>state,
    {getChatList, recvMsg})
export default class Dashboard extends  Component{
    componentDidMount(){
        console.log(this.props)
        if(!this.props.chat.msgs.length) {
            this.props.getChatList()
            this.props.recvMsg()
        }

    }
    render(){
        const {role} = this.props.user
        var navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                ishide:role=='genius'
            },
            {
                path:'/genius',
                text:'老板',
                icon:'genius',
                title:'老板列表',
                component:Genius,
                ishide:role=='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,

            },
            {
                path:'/me',
                text:'我',
                icon:'msg',
                title:'个人中心',
                component:User,

            },
        ]
        const {pathname}=this.props.location
        // console.log(pathname)
        return (
            <div>
                <NavBar mode='dark' className='fixd-header'>
                    {navList.find(value => value.path==pathname).title}
                </NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(value => (
                            <Route key={value.path} path={value.path} component={value.component} />
                        ))}
                    </Switch>
                </div>
                <NavLink data={navList} />
            </div>
        )
    }

}