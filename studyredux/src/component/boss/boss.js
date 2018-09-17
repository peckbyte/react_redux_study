import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {getuserlist} from "../../redux/user/getUserList";

@connect(state=>state.userList,
    { getuserlist }
    )

class Boss extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.getuserlist('genius')
        this.setState({
            data:this.state.list
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <WingBlank/>
                {this.props.list.map(v => (
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
                            {v.need.split('\n').map(v=>(<div>{v}</div>))}
                        </Card.Body>
                    </Card>
                        </WingBlank>
                    ):null

                ))}
            </div>
        )
    }
}

export default Boss