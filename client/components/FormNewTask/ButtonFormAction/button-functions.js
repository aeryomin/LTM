/* eslint-disable no-console */
import store, { getSocket } from '../../../redux'
import { toggleDispayForm, toggleEditForm, clearTaskData } from '../../../redux/reducers/form'
import {
  setOverflowYScroll,
  sendTaskDataFromForm,
  updateTaskDataFromForm
} from '../../../redux/reducers/tasks'
import ui from '../../UI/config.ui'

export function sendData(taskData) {
  if (taskData.title !== '' && taskData.executor !== '') {
    sendTaskDataFromForm(taskData)
      .then((res) => res.json())
      .then(() => {
        store.dispatch(toggleDispayForm())
        store.dispatch(setOverflowYScroll(ui.tasklist.overflowYScroll))
        store.dispatch(clearTaskData())
        getSocket().send('DB is updated')
      })
    return 'done'
  }
  return 'not filled'
}

export function updateData(taskData) {
  if (taskData.title !== '' && taskData.executor !== '') {
    updateTaskDataFromForm(taskData)
      .then((res) => res.json())
      .then(() => {
        store.dispatch(toggleDispayForm())
        store.dispatch(toggleEditForm(false))
        store.dispatch(setOverflowYScroll(ui.tasklist.overflowYScroll))
        store.dispatch(clearTaskData())
        getSocket().send('DB is updated')
      })
    return 'done'
  }
  return 'not filled'
}

export function makeCancel() {
  store.dispatch(toggleDispayForm())
  store.dispatch(toggleEditForm(false))
  store.dispatch(setOverflowYScroll(ui.tasklist.overflowYScroll))
  store.dispatch(clearTaskData())
}
