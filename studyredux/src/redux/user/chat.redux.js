import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

const MSG_LIST = 'messages_list'
const MSG_RECV = 'receive_messages'
const MSG_READ = 'read_messages'

const initial_state = {
    msgs: [],
    users:{},
    unread: 0,
}

export function chat(state = initial_state, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state,users:action.payload.users,msgs:action.payload.msgs,unread:action.payload.msgs.filter(v=>(v.to==action.payload.userid)&&(!v.read)).length}
        case MSG_RECV:
            const n = action.userid==action.payload.to?1:0
            return {...state,msgs:[...state.msgs,action.payload],unread:state.unread+n}
        case MSG_READ:

            const from = action.payload.from
            console.log(from)
            return {...state,msgs:state.msgs.map(v=>({...v,read:from==v.from?true:v.read})),
                    unread:state.unread-action.payload.num}
        default:
            return state
    }
}

function msgList(msgs,users,userid) {
    return {type:MSG_LIST,payload:{msgs,users,userid}}

}

export function getChatList() {
      return(dispatch,getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const userid=getState().user._id
                    dispatch(msgList(res.data.msgs,res.data.users,userid))
                }
            })
    }
}

export function sendMsg({from, to, msg}) {
return dispatch => {
    socket.emit('sendmsg',{from, to, msg})
}
}

function recvmsgList(data,userid) {
    return {type:MSG_RECV, payload:data,userid}
}

export function recvMsg() {
    return (dispatch,getState) => {
        socket.on('recvmsg',(data)=>{
            const userid = getState().user._id
            dispatch(recvmsgList(data,userid))
        })

    }
}

function readmsg({from,userid,num}) {
    return {type:MSG_READ,payload:{from,userid,num}}
}

export function readMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg',{from})
            .then(
                res=> {
                    const userid = getState().user._id
                    if (res.status==200 && res.data.code==0){
                        dispatch(readmsg({from,userid,num:res.data.num}))
                    }
                }
            )
    }
}