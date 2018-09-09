import { combineReducers } from 'redux'
import { counter } from './index.redux'
import { auth } from './Auth.rudex'

export default combineReducers({counter,auth})
