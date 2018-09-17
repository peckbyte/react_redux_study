import React, { Component } from 'react'
import {NavBar, Button, List, InputItem, TextareaItem, WhiteSpace, WingBlank} from 'antd-mobile'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import AvatarSelector from '../../component/avatar/avatarSelector'
import {connect} from 'react-redux'
import {update} from "../../redux/user/user.redux";

@connect(state => state.user,
    {update})

export default class Geniusinfo extends Component {

    // static propTypes = {
    //     update: PropTypes.func
    // }

    constructor(props) {
        super(props)
        this.state = {
            job: '',
            salary: '',
            resume: '',
        }
        this.itemOnChange = this.itemOnChange.bind(this)
        this.buttonClick = this.buttonClick.bind(this)
    }

    itemOnChange(key, value) {
        this.setState({
            [key]: value,
        })
    }

    buttonClick() {
        this.props.update(this.state)
    }

    render() {
        const path = this.props.location.pathname
        const redirect =this.props.redirect
        return (
            <div>
                {(redirect && redirect!=path)?(<Redirect to={this.props.redirect} />):null}
                <NavBar
                    mode="dark"
                >牛人设置</NavBar>
                <WingBlank>
                    <AvatarSelector selectAvatar={(imgName)=>{
                        this.setState({
                            avatar:imgName
                        })
                    }}/>
                    <List>
                        <WhiteSpace sz='lg'/>
                        <InputItem placeholder='应聘岗位' onChange={v => this.itemOnChange('job', v)}>应聘岗位</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='薪资范围' onChange={v => this.itemOnChange('salary', v)}>薪资要求</InputItem>
                        <WhiteSpace/>
                        <TextareaItem
                            title="自我介绍"
                            autoHeight
                            rows={3}
                            placeholder='岗位需求'
                            onChange={v => this.itemOnChange('need', v)}
                        />
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.buttonClick}>保存</Button>
                </WingBlank>
            </div>
        )
    }


}

// Bossinfo.propTypes = {
//     update: PropTypes.func.isRequired, // eslint-disable-line
// }
