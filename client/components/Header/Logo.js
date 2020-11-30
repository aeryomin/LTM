import React from 'react'
import ui from '../UI/config.ui'

const Logo = (props) => {
  return (
    <div className={`my-auto pl-1 ${ui.header.Logo.fontSize} ${ui.header.Logo.fontColor}`}>
      <a href="/" className="">
        {props.content}
      </a>
    </div>
  )
}

export default Logo
