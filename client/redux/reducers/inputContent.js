// import store from '..'

const SET_MARKED_LIST = 'SET_MARKED_LIST'

const initialState = {
  isMarkedList: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MARKED_LIST: {
      return { ...state, isMarkedList: action.isMarkedList }
    }
    default:
      return state
  }
}

export function setMarkedList(isMarkedList) {
  // const { isMarkedList } = store.getState().inputContent
  return { type: SET_MARKED_LIST, isMarkedList }
}
