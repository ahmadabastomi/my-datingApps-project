import { combineReducers } from 'redux'

import users from './users'
import images from './images'

const appReducer = combineReducers({
    users,
    images,
})

export default appReducer