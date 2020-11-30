import React from 'react'
import { useDispatch } from 'react-redux'
import { setActiveGroupID } from '../../../redux/reducers/groups'
import { getTasklist } from '../../../redux/reducers/tasks'

const GroupButton = (props) => {
  const dispatch = useDispatch()

  return (
    <button
      className=" text-lg border rounded-sm bg-gray-600 text-gray-200 hover:bg-gray-400"
      type="button"
      onClick={() => {
        props.setSelectedGroup(props.group.name)
        dispatch(setActiveGroupID(props.group._id))
        dispatch(getTasklist())
        props.setIsDropdownShown(!props.isDropdownShown)
      }}
    >
      {props.group.name}
    </button>
  )
}

export default GroupButton
