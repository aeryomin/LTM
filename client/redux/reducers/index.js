import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import tasks from './tasks'
import form from './form'
import inputContent from './inputContent'
import groups from './groups'
import users from './users'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    tasks,
    form,
    inputContent,
    groups,
    users
  })

export default createRootReducer
