import React, {Component} from 'react'
import io from 'socket.io-client'
import {List, InputItem} from 'antd-mobile'
const socket = io('ws://localhost:9093')



class Chat extends Component {
   constructor(props){
       super(props)
       this.state={
           text:'',
           msg:[]
       }
   }

    componentDidMount() {
        socket.on('recvmsg',data=> {
            this.setState({
                msg:[...this.state.msg,data.text]
            })
                })
    }
    handleSubmit(){
        socket.emit('sendmsg',{text:this.state.text})
        console.log(this.state.text)
        this.setState({
            text:''
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