import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(state => state)

class Msg extends Component {
   constructor(props){
       super(props)
       this.getLast=this.getLast.bind(this)
}
    getLast(arr) {
        return arr[arr.length - 1]
    }

    render() {
        const Item = List.Item
        const Brief = Item.Brief
        const chatgroup = {}
        this.props.chat.msgs.map(v => {
            chatgroup[v.chatid] = chatgroup[v.chatid] || []
            chatgroup[v.chatid].push(v)
        })
        const {users} = this.props.chat
        const userid = this.props.user._id
        const chatlist = Object.values(chatgroup)
        chatlist.sort((a,b) => {
            const a_lastitem = this.getLast(a).create_time
            const b_lastitem = this.getLast(b).create_time
            return b_lastitem-a_lastitem
        })

        return (

                chatlist.map(v => {
                const lastItem = this.getLast(v)

                    const targetID=v[0].from==userid?v[0].to:v[0].from
                    if(!users[targetID]){
                    return null
                    }
                    const unread=v.filter(val=>!val.read&&val.to==userid).length
                    const briefName = users[targetID].name
                    const avatar = require(`../img/${users[targetID].avatar}.png`)
                return (
                    <div key={lastItem._id}>
                        <List>
                            <Item
                                extra={<Badge text={unread}></Badge>}
                                thumb={avatar}
                                arrow='horizontal'
                                onClick={()=>this.props.history.push(`/chat/${targetID}`)}
                            >
                                {lastItem.content}
                                <Brief>{ briefName }</Brief>
                            </Item>
                        </List>
                    </div>
                )
            })
    )
    }
}

export default Msg