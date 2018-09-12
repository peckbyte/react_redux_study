import axios from 'axios'
import {redirectTo} from "../../util";
const REGISTER_SUCCESS = 'register'
const ERROR_MSG = 'error_msg'
const LOGIN_SUCCESS = 'login_success'
const initial_data = {
    isAuth: '',
    redirect:'',
    msg: '',
    user: '',
    psw: '',
    repeatpsw: '',
    role: ''
}

export function user(state = initial_data, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', isAuth: true,redirect:redirectTo(action.payload), ...action.payload}
        case LOGIN_SUCCESS:
            return {...state,msg:'',isAuth:true,redirect:redirectTo(action.payload),...action.payload}
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

function loginSuccess(data) {
    return {type:LOGIN_SUCCESS, payload:data}
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
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(registerSuccess({user,psw,role}))
                } else {
                    // console.log(res.data.msg)
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}



export function login({user, psw}) {
    if (!user || !psw) {
        return (errorMsg('用户名或密码不能为空'))
    }

    return dispatch => {
        axios.post('/user/login',{user,psw})
    .then(res => {
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(loginSuccess(res.data.data))
                } else {
                    // console.log(res.data.msg)
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}