import React,{Component} from 'react'
import { Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import Boss from '../../container/boss/boss'
import Genius from '../../container/genius/genius'
import Msg from '../../container/msg/msg'
import User from '../../container/user/user'
import NavLink from '../navlink/navlink'
import { NavBar } from 'antd-mobile'

@connect(state=>state.user)
export default class Dashboard extends  Component{

    render(){
        const {role} = this.props
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
                <NavBar mode='dark'>{navList.find(value => value.path==pathname).title}</NavBar>
                <div>dashboard</div>
                <NavLink data={navList} />
            </div>
        )
    }

}