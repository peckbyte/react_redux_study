import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

const MSG_LIST = 'messages_list'
const MSG_RECV = 'receive_messages'
const MSG_READ = 'read_messages'

const initial_state = {
    msg: [],
    unread: 0,
}

export function chat(state = initial_state, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state,msg:action.payload.msgs}
        case MSG_RECV:
            return {...state,msg:[...state.msg,action.payload]}
        case MSG_READ:
        default:
            return state
    }
}

function msgList(data) {
    return {type:MSG_LIST,payload:data}

}

export function getChatList() {
    return (dispatch) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgList(res.data))
                }
            })
    }
}

export function sendMsg({from, to, msg}) {
return dispatch => {
    socket.emit('sendmsg',{from, to, msg})
}
}

function recvmsgList(data) {
    return {type:MSG_RECV, payload:data}
}

export function recvMsg() {
    return dispatch => {
        socket.on('recvmsg',(data)=>{
            console.log('recvmsg:',data)
            dispatch(recvmsgList(data))
        })

    }
}