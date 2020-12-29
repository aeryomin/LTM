/* eslint-disable no-console */
import store, { getSocket } from '..'

const GET_GROUP_LIST = 'GET_GROUP_LIST'
const SET_ACTIVE_GROUP_ID = 'SET_ACTIVE_GROUP_ID'

const initialState = {
  groupList: [],
  activeGroupID: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_LIST: {
      return { ...state, groupList: action.groupList }
    }
    case SET_ACTIVE_GROUP_ID: {
      return { ...state, activeGroupID: action.activeGroupID }
    }
    default:
      return state
  }
}

export function addUserToGroup(activeUserID) {
  const { activeGroupID } = store.getState().groups

  return fetch(`/api/v2/group/${activeGroupID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: activeUserID, action: 'add user' })
  }).then(() => {
    getSocket().send('group is changed')
  })
}

export function removeUserToGroup(activeUserID) {
  const { activeGroupID } = store.getState().groups

  return fetch(`/api/v2/group/${activeGroupID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: activeUserID, action: 'remove user' })
  }).then(() => {
    getSocket().send('group is changed')
  })
}

export function removeGroup() {
  const { activeGroupID } = store.getState().groups

  return fetch(`/api/v2/group/${activeGroupID}`, {
    method: 'DELETE'
  }).then(() => {
    getSocket().send('group is changed')
  })
}

// export function removeGroup() {
//   const { activeGroupID } = store.getState().groups

//   return fetch(`/api/v2/group/${activeGroupID}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ action: 'remove group' })
//   }).then(() => {
//     getSocket().send('group is changed')
//   })
// }

export function setActiveGroupID(activeGroupID) {
  return { type: SET_ACTIVE_GROUP_ID, activeGroupID }
}

export function creatGroup(groupData) {
  return fetch('/api/v2/group', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(groupData)
  }).then(() => {
    getSocket().send('group is changed')
  })
}

export function getGrouplist() {
  return (dispatch) => {
    fetch(`/api/v2/group`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_GROUP_LIST,
          groupList: data.groups
        })
      })
  }
}
