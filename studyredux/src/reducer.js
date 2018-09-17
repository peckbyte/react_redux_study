import { combineReducers } from 'redux'
import {user} from "./redux/user/user.redux";
import {userList} from "./redux/user/getUserList";

export default combineReducers({user, userList})
