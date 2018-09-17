import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {loadData} from "../../redux/user/user.redux";

@withRouter
    @connect(null,
        {loadData})

class AuthRouter extends React.Component {

    componentDidMount() {
        //获取用户信息
        const urlPath = this.props.location.pathname
        // console.log(this.props.location.pathname)
        // console.log(urlPath)
        const authedPath = ['/login', '/register']
        if (authedPath.indexOf(urlPath) > -1) {
            // console.log(authedPath.indexOf(urlPath))

            return null
        }
        console.log(authedPath.indexOf(urlPath))

        axios.get('/user/info').then(res => {
            if (res.status == 200) {
                if (res.data.code == 0) {
                    // 有登录信息de
                   this.props.loadData(res.data.data)
                } else {
                    this.props.history.push('/login')
                }
            }
        })

    }

    render() {
        return null
    }
}

export default AuthRouter

