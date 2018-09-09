import axios from 'axios'
const ADD = '加'
const REMOVE = '减'
const USERDATA = '获取数据'
const peckData = {
    num:0,
    name: "李星",
    job:"医生"
}
export function counter(state=peckData, action) {


    switch (action.type) {
        case ADD:
            return {...state,num:state.num+1}
        case REMOVE:
            return {...state,num:state.num-1}
        case USERDATA:
            return {...state,...action.play}
        default:
            return state
    }
}


export function getUser() {
    return dispatch => {
        axios.get('/data')
        .then((res) => {
            if(res.status===200) {
                dispatch(userDATA(res.data))
            }
        })
    }
}

export function userDATA(data) {
    return {type:USERDATA,play:data}

}

export function addDATA() {
    return {type:ADD}

}

export function removeDATA() {
    return {type:REMOVE}
}
 
export function addDATAasync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(addDATA())
        },2000)
    }
}