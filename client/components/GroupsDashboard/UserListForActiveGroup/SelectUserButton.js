import React from 'react'
import { useDispatch } from 'react-redux'
import ui from '../../UI/config.ui'

const SelectUserButton = (props) => {
  const dispatch = useDispatch()

  return (
    <button
      className={`flex flex-col w-4/6 space-y-1 border rounded pl-2   text-left
          ${ui.groups.SelectButton.active.bgColor}
          ${ui.groups.SelectButton.active.fontSize}
          ${ui.groups.SelectButton.active.fontColor}
          hover:${ui.groups.SelectButton.hover.bgColor}
          hover:${ui.groups.SelectButton.hover.fontColor}`}
      type="button"
      onClick={() => {
        dispatch(props.setSelectedUserID(props.user._id))
      }}
    >
      {props.user.fullname}
    </button>
  )
}

export default SelectUserButton
