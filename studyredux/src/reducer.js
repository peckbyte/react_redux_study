import { combineReducers } from 'redux'
import {user} from "./redux/user/user.redux";
import {userList} from "./redux/user/getUserList";
import { chat } from './redux/user/chat.redux'
export default combineReducers({user, userList, chat})
