const GET_USER_LIST = 'get user list'
const axios = require('axios')
const initial_data={
    list:[]
}

export function userList(state=initial_data,action) {
    switch (action.type) {
        case GET_USER_LIST:
            return {...state,list:action.payload}
        default:
            return state
    }
}

function UserList(data) {
    return {type:GET_USER_LIST,payload:data}
}

export function getuserlist(role){
    return dispatch => {
        axios(`user/list?role=${role}`)
            .then(res=>{
                if(res.data.code==0){
                    dispatch(UserList(res.data.data))
                }
            })
    }


}