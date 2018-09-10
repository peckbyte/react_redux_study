import axios from 'axios'

const REGISTER_SUCCESS = 'register'
const ERROR_MSG = 'error_msg'
const initial_data = {
    isAuth: '',
    msg: '',
    user: '',
    psw: '',
    repeatpsw: '',
    role: ''
}

export function user(state = initial_data, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', isAuth: true, ...action.payload}
        case ERROR_MSG :
            return {...state, msg: action.msg}
        default:
            return state
    }

}

function errorMsg(msgdata) {
    return {msg: msgdata, type: ERROR_MSG}
}

function registerSuccess(data) {
    return {payload: data, type: REGISTER_SUCCESS}
}

export function register({user, psw, repeatpsw, role}) {
    if (!user || !psw || !repeatpsw) {
        return (errorMsg('用户名或密码不能为空'))
    }

    if (psw != repeatpsw) {
        return (errorMsg('密码需一致'))
    }

    return dispatch => {
        // axios.get('/user/register')
        axios.post('/user/register',{user,psw,role})
    .then(res => {
                if (res.status == 200 && res.data.code === 1) {
                    dispatch(registerSuccess({user,psw,role}))
                } else {
                    return (errorMsg(res.data.msg))
                }
            })
    }
}