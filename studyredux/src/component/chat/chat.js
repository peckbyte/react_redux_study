import React, {Component} from 'react'
import {List, InputItem} from 'antd-mobile'
import { connect } from 'react-redux'
import {getChatList, sendMsg, recvMsg} from "../../redux/user/chat.redux";

@connect(state=>state,
    {getChatList, sendMsg, recvMsg}
    )
class Chat extends Component {
   constructor(props){
       super(props)
       this.state={
           text:'',
           msg:[]
       }
   }

    componentDidMount() {
        // socket.on('recvmsg',data=> {
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        //         })
        console.log(this.props.chat)
        this.props.getChatList()
        this.props.recvMsg()
    }
    handleSubmit(){
        // socket.emit('sendmsg',{text:this.state.text})
        // console.log(this.state.text)
        // this.setState({
        //     text:''
        // })
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({
            text:'',
        })


    }
    render() {
        console.log(this.props)
        return (
            <div>
                {this.state.msg.map(v=>{
                    return (<p key={v}>{v}</p>)
                })}

                <div className='stick-footer' >
                    <List>
                        <InputItem
                        placeholer='请输入'
                        value={this.state.text}
                        onChange={v => {
                            this.setState({
                                text:v,
                            })
                        }}
                        extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
                        >
                            信息
                        </InputItem>
                    </List>

                </div>
            </div>
        )
    }
}

export default Chat