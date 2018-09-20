import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {getuserlist} from '../../redux/user/getUserList';
import InfoList from '../infoList/infoList'
@connect(state=>state.userList,
    { getuserlist }
    )

class Boss extends Component {

    constructor(props) {
        super(props);
        }
    componentDidMount() {
        this.props.getuserlist('genius')
    }

    render(){
        return (
            <InfoList userList={this.props.list}/>
        )
    }
}

export default Boss