/* eslint-disable no-console */
import React from 'react'
import { useDispatch } from 'react-redux'
import { getUser, updateUser } from '../../redux/reducers/auth'

const ActionButton = (props) => {
  const dispatch = useDispatch()

  return (
    <button
      className="w-1/5 flex-shrink-0 text-sm border rounded-sm bg-gray-600 hover:bg-gray-400"
      type="button"
      onClick={() => {
        updateUser(props.user._id, props.field, props.buttonValue)
        dispatch(getUser(props.user._id))
        props.setIsEdit(!props.isEdit)
      }}
    >
      {props.content}
    </button>
  )
}

export default ActionButton
