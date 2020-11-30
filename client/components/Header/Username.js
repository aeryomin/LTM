/* eslint-disable no-console */
import React from 'react'
import ui from '../UI/config.ui'

const Username = (props) => {

  return (
    <div
      className={`${ui.header.Username.bgColor} ${ui.header.Username.fontSize} ${ui.header.Username.fontColor}`}
    >
      {props.user.fullname}
    </div>
  )
}

export default Username
