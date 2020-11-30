import React from 'react'
import ui from '../../UI/config.ui'

const Button = (props) => {
  return (
    <button
      className={`button border rounded p-2
        ${ui.groups.Button.borderColor}
        ${ui.groups.Button.active.fontSize}
        ${ui.groups.Button.active.fontColor}
        hover:${ui.groups.Button.hover.fontSize}
        hover:${ui.groups.Button.hover.fontColor}
        hover:${ui.groups.Button.hover.bgColor}`}
      type="button"
      onClick={props.action}
    >
      {props.content}
    </button>
  )
}

export default Button
