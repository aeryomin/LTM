/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser, updateUser } from '../../redux/reducers/auth'

const InputField = (props) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(
    props.field === 'fullname' ? props.user.fullname : props.user.email
  )

  useEffect(() => {
    props.setButtonValue(value)
  }, [])

  return (
    <input
      className="w-4/5 text-gray-800"
      type="text"
      value={value}
      onChange={(event) => {
        setValue(event.target.value)
        props.setButtonValue(event.target.value)
      }}
      onKeyPress={(event) => {
        switch (event.key) {
          case 'Enter': {
            event.preventDefault()
            updateUser(props.user._id, props.field, value)
            dispatch(getUser(props.user._id))
            props.setIsEdit(!props.isEdit)
            break
          }
          default:
            break
        }
      }}
    />
  )
}

export default InputField
