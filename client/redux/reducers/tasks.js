/* eslint-disable no-console */
import store from '..'
import ui from '../../components/UI/config.ui'

const GET_TASKLIST = 'GET_TASKLIST'
const SET_TASKLIST_TO_RENDER = 'SET_TASKLIST_TO_RENDER'
const SET_OVERFLOW_Y_SCROLL = 'SET_OVERFLOW_Y_SCROLL'
const SET_FILTER_OPTION = 'SET_FILTER_OPTION'
const SET_SORT_OPTION = 'SET_SORT_OPTION'
const SET_SORT_EXCHANGE = 'SET_SORT_EXCHANGE'

const initialState = {
  tasklist: [],
  tasklistToRender: [],
  filterOption: 'all',
  sortOption: 'name',
  sortExchange: 'up',
  overflowYScroll: ui.tasklist.overflowYScroll
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKLIST: {
      return { ...state, tasklist: action.tasklist }
    }
    case SET_FILTER_OPTION: {
      return { ...state, filterOption: action.filterOption }
    }
    case SET_SORT_OPTION: {
      return { ...state, sortOption: action.sortOption }
    }
    case SET_SORT_EXCHANGE: {
      return { ...state, sortExchange: action.sortExchange }
    }
    case SET_TASKLIST_TO_RENDER: {
      return { ...state, tasklistToRender: action.tasklistToRender }
    }
    case SET_OVERFLOW_Y_SCROLL: {
      return { ...state, overflowYScroll: action.overflowYScroll }
    }
    default:
      return state
  }
}

export function getTasklist() {
  return (dispatch) => {
    fetch(`/api/v2/task`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_TASKLIST,
          tasklist: data.tasks
        })
      })
  }
}

export function setOverflowYScroll(overflowYScroll) {
  return { type: SET_OVERFLOW_Y_SCROLL, overflowYScroll }
}

export function setFilterOption(filterOption) {
  return { type: SET_FILTER_OPTION, filterOption }
}

export function setSortOption(sortOption) {
  return { type: SET_SORT_OPTION, sortOption }
}

export function setSortExchange(sortExchange) {
  return { type: SET_SORT_EXCHANGE, sortExchange }
}

export function setTasklistToRender(filterOption, sortOption) {
  const { tasklist } = store.getState().tasks
  const { activeGroupID } = store.getState().groups
  const { sortExchange } = store.getState().tasks
  let tasklistToRender = []

  if (activeGroupID === '') {
    return { type: SET_TASKLIST_TO_RENDER, tasklistToRender }
  }

  tasklistToRender = tasklist.filter((task) => task.groupID === activeGroupID)

  if (filterOption === 'all') {
    tasklistToRender = [...tasklistToRender]
  } else {
    tasklistToRender = tasklistToRender.filter((item) => item.status === filterOption)
  }

  switch (sortOption) {
    case 'name': {
      tasklistToRender.sort((a, b) => {
        return sortExchange === 'up'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      })
      break
    }
    case 'date': {
      tasklistToRender.sort((a, b) =>
        sortExchange === 'up'
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      )
      break
    }
    case 'expDate': {
      tasklistToRender.sort((a, b) => {
        if (a.expiredAt !== null && b.expiredAt !== null) {
          return sortExchange === 'up'
            ? new Date(a.expiredAt) - new Date(b.expiredAt)
            : new Date(b.expiredAt) - new Date(a.expiredAt)
        }
        return 0
      })
      break
    }
    default:
      break
  }

  return { type: SET_TASKLIST_TO_RENDER, tasklistToRender }
}

export function sendTaskDataFromForm(taskData) {
  return fetch('/api/v2/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })
}

export function updateTaskDataFromForm(taskData) {
  return fetch('/api/v2/task', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })
}

export function updateField(obj) {
  return fetch('/api/v2/task', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
}
