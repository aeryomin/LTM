import React from 'react'
import ui from '../../../UI/config.ui'

const SelectUserButton = (props) => {
  return (
    <button
      className={`flex flex-col w-full mx-2 space-y-1 border rounded pl-2
          ${ui.groups.SelectButton.active.bgColor}
          ${ui.groups.SelectButton.active.fontSize}
          ${ui.groups.SelectButton.active.fontColor}
          hover:${ui.groups.SelectButton.hover.bgColor}
          hover:${ui.groups.SelectButton.hover.fontColor}`}
      type="button"
      onClick={() => {
        props.setSelectedUser(props.user)
      }}
    >
      {props.user.fullname}
    </button>
  )
}

export default SelectUserButton
