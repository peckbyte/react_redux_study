import React, {Component} from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getChatList, sendMsg, recvMsg} from "../../redux/user/chat.redux";
import {getChatid} from "../../util";

@connect(state => state,
    {getChatList, sendMsg, recvMsg}
)
class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
        this.fixCarousel = this.fixCarousel.bind(this)
    }

    fixCarousel() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    componentDidMount() {

        if (!this.props.chat.msgs.length) {
            this.props.getChatList()
            this.props.recvMsg()
        }
        this.fixCarousel()
    }


    handleSubmit() {
        // socket.emit('sendmsg',{text:this.state.text})
        // console.log(this.state.text)
        // this.setState({
        //     text:''
        // })
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from, to, msg})
        this.setState({
            text: '',
            showemoji: false
        })
    }

    render() {

        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({text: v}))

        console.log(this.props)

        const userid = this.props.match.params.user
        const chatid = getChatid(userid, this.props.user._id)
        const chatmsgs = this.props.chat.msgs.filter(v => v.chatid == chatid)
        const Item = List.Item
        const users = this.props.chat.users
        if (!users[userid]) {
            return null
        }
        console.log(users[userid])
        return (
            <div id='chat-page'>
                <NavBar
                    model='dark'
                    icon={<Icon type='left'/>}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}

                >
                    {users[userid].name}
                </NavBar>
                {
                    chatmsgs.map(
                        v => {
                            const avatar = require(`../img/${users[v.from].avatar}.png`)
                            return v.from == userid ?
                                (
                                    <List>
                                        <Item
                                            thumb={avatar}
                                            key={v._id}
                                        >
                                            {`对方说：${v.content}`}
                                        </Item>
                                    </List>) :
                                (
                                    <List>
                                        <Item
                                            extra={<img src={avatar}/>}
                                            className='chat-me' key={v._id}
                                        >
                                            {`我说：${v.content}`}
                                        </Item>
                                    </List>
                                )
                        })

                }

                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholer='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({
                                    text: v,
                                })
                            }}
                            extra={
                                <div>
                                <span
                                    style={{marginRight: 15}}
                                    onClick={() => {
                                        this.setState({
                                            showemoji: !this.state.showemoji
                                        })
                                        this.fixCarousel()
                                    }}

                                >
                                😀
                            </span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }
                        >
                            信息
                        </InputItem>
                        {this.state.showemoji ? (
                            <Grid data={emoji}
                                  columnNum={9}
                                  isCarousel
                                  carouselMaxRow={3}
                                  onClick={el=>{this.setState({
                                      text:this.state.text+el.text
                                  })}}

                            />) : null}

                    </List>

                </div>
            </div>
        )
    }
}

export default Chat