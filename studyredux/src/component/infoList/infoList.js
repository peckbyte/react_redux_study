import React,{ Component } from 'react'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
import { getuserlist } from "../../redux/user/getUserList";
import PropTypes from 'prop-types'

export default class InfoList extends Component {
    static propTypes = {
    userList: PropTypes.array.isRequired
}
   constructor(props) {
       super(props)
   }

    render(){
        const list = this.props.userList
        return(
            <div>
                <WingBlank/>
                {list.map(v => (
                    v.avatar?(
                        <WingBlank>
                            <Card key={v._id}>
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`../img/${v.avatar}.png`)}
                                    extra={<div>{v.job}</div>}
                                >
                                </Card.Header>
                                <Card.Body>
                                    {v.role=='boss'?
                                        (
                                            <div>{`公司：${v.company}`}</div>
                                        ):null}
                                    {v.need.split('\n').map((d,index)=>(<div >{d}</div>))}
                                    {v.role=='boss'?
                                        (
                                            <div>{`薪水：${v.salary}`}</div>
                                        ):null}

                                </Card.Body>
                            </Card>
                        </WingBlank>
                    ):null

                ))}
            </div>
        )
    }
}