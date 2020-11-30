import React from 'react'

const Button = (props) => {
  return (
    <button
      className="button border border-gray-400 rounded p-2"
      type="button"
      onClick={() => {
        props.action(props.valueForAction)
        props.setIsFindButtonPressed(true)
      }}
    >
      {props.content}
    </button>
  )
}

export default Button
