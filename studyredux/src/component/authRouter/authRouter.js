import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter

class AuthRouter extends React.Component{

    componentDidMount(){
        //获取用户信息
        const urlPath = this.props.location.pathname
        const authedPath = ['/login','/register']
        if (authedPath.indexOf(urlPath)> -1) {
            return null
        }

        axios.get('/user/info')
            .then((res) => {
                if(res.status === 0){
                } else {
                    console.log(this.props)
                   this.props.history.push('/register')
                }
            })

    }
    render() {
        return(
            <div>测试AuthRouter</div>
        )
    }
}

export default AuthRouter

