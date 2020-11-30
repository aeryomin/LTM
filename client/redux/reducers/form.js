/* eslint-disable no-console */
import store from '..'

const TOGGLE_DISPLAY_FORM = 'TOGGLE_DISPLAY_FORM'
const TOGGLE_IS_FORM_EDIT = 'TOGGLE_IS_FORM_EDIT'
const SET_TITLE = 'SET_TITLE'
const SET_CONTENT = 'SET_CONTENT'
const SET_EXPIRATION_DATE = 'SET_EXPIRATION_DATE'
const SET_CREATOR = 'SET_CREATOR'
const SET_EXECUTOR = 'SET_EXECUTOR'
const SET_GROUP_ID = 'SET_GROUP_ID'
const CLEAR_TASK_DATA = 'CLEAR_TASK_DATA'
const SET_ID = 'SET_ID'
const PUT_NEW_STRING = 'PUT_NEW_STRING'
const CLEAR_LAST_STRING = 'CLEAR_LAST_STRING'

const initialState = {
  isFormShown: false,
  isFormEdit: false,
  newTaskData: {
    id: '',
    title: '',
    content: '',
    expiredAt: null,
    creator: '',
    executor: '',
    groupID: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DISPLAY_FORM: {
      return { ...state, isFormShown: action.isFormShown }
    }
    case SET_TITLE: {
      return { ...state, newTaskData: { ...state.newTaskData, title: action.title } }
    }
    case SET_CONTENT: {
      return { ...state, newTaskData: { ...state.newTaskData, content: action.content } }
    }
    case SET_EXPIRATION_DATE: {
      return {
        ...state,
        newTaskData: { ...state.newTaskData, expiredAt: action.expiredAt }
      }
    }
    case SET_CREATOR: {
      return { ...state, newTaskData: { ...state.newTaskData, creator: action.creator } }
    }
    case SET_EXECUTOR: {
      return { ...state, newTaskData: { ...state.newTaskData, executor: action.executor } }
    }
    case SET_GROUP_ID: {
      return { ...state, newTaskData: { ...state.newTaskData, groupID: action.groupID } }
    }
    case TOGGLE_IS_FORM_EDIT: {
      return { ...state, isFormEdit: action.isFormEdit }
    }
    case CLEAR_TASK_DATA: {
      return {
        ...state,
        newTaskData: {
          ...state.newTaskData,
          id: '',
          executor: '',
          title: '',
          content: '',
          expiredAt: null,
          creator: '',
          groupID: ''
        }
      }
    }
    case SET_ID: {
      return { ...state, newTaskData: { ...state.newTaskData, id: action.id } }
    }
    case PUT_NEW_STRING: {
      return { ...state, newTaskData: { ...state.newTaskData, content: action.content } }
    }
    case CLEAR_LAST_STRING: {
      return { ...state, newTaskData: { ...state.newTaskData, content: action.content } }
    }
    default:
      return state
  }
}

export function toggleDispayForm() {
  const { isFormShown } = store.getState().form
  return { type: TOGGLE_DISPLAY_FORM, isFormShown: !isFormShown }
}

export function toggleEditForm(isFormEdit) {
  // const { isFormEdit } = store.getState().form
  return { type: TOGGLE_IS_FORM_EDIT, isFormEdit }
}

export function setTitle(title) {
  return { type: SET_TITLE, title }
}

export function setContent(content) {
  return { type: SET_CONTENT, content }
}

export function setExpirationDate(expiredAt) {
  return { type: SET_EXPIRATION_DATE, expiredAt }
}

export function setCreator(creator) {
  return { type: SET_CREATOR, creator }
}

export function setExecutor(executor) {
  return { type: SET_EXECUTOR, executor }
}

export function setGroupID(groupID) {
  return { type: SET_GROUP_ID, groupID }
}

export function clearTaskData() {
  return { type: CLEAR_TASK_DATA }
}

export function isContentInLastString() {
  let { content: oldContent } = store.getState().form.newTaskData
  oldContent = oldContent.split('\n')
  const lastString = oldContent[oldContent.length - 1]
  const reg = /[\wа-яА-ЯЁё]/g
  return reg.test(lastString)
}

export function putNewString(str) {
  const { content: oldContent } = store.getState().form.newTaskData
  const newContent = oldContent.concat(str)
  return { type: PUT_NEW_STRING, content: newContent }
}

export function clearLastSrting() {
  const { content: oldContent } = store.getState().form.newTaskData
  const arr = oldContent.match(/[\wа-яА-ЯЁё -]+/gm)
  arr.splice(arr.length - 1, 1, '')
  const newContent = arr.join('\n')
  return { type: CLEAR_LAST_STRING, content: newContent }
}

export function setId(id) {
  return { type: SET_ID, id }
}
