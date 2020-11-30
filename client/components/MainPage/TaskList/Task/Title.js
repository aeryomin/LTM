import React from 'react'
import getFieldData from '../../../addons/getFieldData'

const Title = (props) => {
  const { task } = props

  return (
    <div
      className={`w-auto mx-2 font-custom-content underline font-bold tracking-wider ${getFieldData(
        task.status,
        'title',
        'fontColor'
      )}`}
    >
      {task.title}
    </div>
  )
}

export default Title
