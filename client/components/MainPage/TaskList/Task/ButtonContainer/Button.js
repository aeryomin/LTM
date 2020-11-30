/* eslint-disable no-console */
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  toggleDispayForm,
  toggleEditForm,
  setId,
  setTitle,
  setContent,
  setExecutor,
  setExpirationDate
} from '../../../../../redux/reducers/form'
import { getSocket } from '../../../../../redux'
import { setOverflowYScroll, updateField } from '../../../../../redux/reducers/tasks'
import ui from '../../../../UI/config.ui'
import getFieldData from '../../../../addons/getFieldData'

const updateDBField = (obj) => {
  try {
    updateField(obj)
      .then((res) => res.json())
      .then(() => {
        getSocket().send('DB is updated')
      })
  } catch (err) {
    console.log('action update error:', err)
  }
}

const Button = (props) => {
  const dispatch = useDispatch()

  const actionHandler = () => {
    switch (props.action.type) {
      case 'change DB': {
        updateDBField({
          id: props.task._id,
          field: props.action.field,
          fieldContent: props.action.fieldContent
        })
        break
      }
      case 'edit task': {
        dispatch(toggleDispayForm())
        dispatch(setOverflowYScroll(ui.tasklist.overflowYScroll))
        dispatch(toggleEditForm(true))
        dispatch(setId(props.task._id))
        dispatch(setTitle(props.task.title))
        dispatch(setContent(props.task.content))
        dispatch(setExecutor(props.task.executor))
        dispatch(setExpirationDate(props.task.expiredAt))
        break
      }
      default:
        break
    }
  }

  return (
    <button
      className={`h-5 border border-gray-400 rounded-md px-2 ${getFieldData(
        props.task.status,
        'button',
        'active',
        'bgColor'
      )} ${getFieldData(props.task.status, 'button', 'active', 'fontSize')} ${getFieldData(
        props.task.status,
        'button',
        'active',
        'fontColor'
      )} ${getFieldData(props.task.status, 'button', 'hover', 'bgColor')} hover:bg-opacity-50`}
      type="button"
      onClick={actionHandler}
    >
      {props.buttonContent}
    </button>
  )
}

export default Button
