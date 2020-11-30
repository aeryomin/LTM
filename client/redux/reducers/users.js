/* eslint-disable no-console */
const AUTHENTICATED_USERS = 'AUTHENTICATED_USERS'
const GET_USER_BY_EMAIL = 'GET_USER_BY_EMAIL'
const SET_USERS_FROM_ACTIVE_GROUP = 'SET_USERS_FROM_ACTIVE_GROUP'
const SET_SELECTED_USER_ID = 'SET_SELECTED_USER_ID'

const initialState = {
  authenticatedUsers: [],
  user: {},
  usersFromActiveGroup: [],
  selectedUserID: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATED_USERS: {
      return { ...state, authenticatedUsers: action.users }
    }
    case GET_USER_BY_EMAIL: {
      return { ...state, user: action.user }
    }
    case SET_USERS_FROM_ACTIVE_GROUP: {
      return { ...state, usersFromActiveGroup: action.usersFromActiveGruop }
    }
    case SET_SELECTED_USER_ID: {
      return { ...state, selectedUserID: action.selectedUserID }
    }
    default:
      return state
  }
}

export function setUsersFromActiveGroup(users) {
  return { type: SET_USERS_FROM_ACTIVE_GROUP, usersFromActiveGruop: users }
}

export function setSelectedUserID(id) {
  return { type: SET_SELECTED_USER_ID, selectedUserID: id }
}

export function getAuthenticatedUsers() {
  return (dispatch) => {
    fetch('/api/v2/user')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: AUTHENTICATED_USERS, users: data.users })
      })
  }
}

export function getUserByEmail() {}
