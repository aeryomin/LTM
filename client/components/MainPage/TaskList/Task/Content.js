import React from 'react'
import getFieldData from '../../../addons/getFieldData'

const Content = (props) => {
  const { task } = props

  return (
    <div
      className={`m-2 p-2 border rounded whitespace-pre-line overflow-y-scroll ${getFieldData(
        task.status,
        'content',
        'fontSize'
      )} ${getFieldData(props.task.status, 'content', 'fontColor')} ${getFieldData(
        task.status,
        'content',
        'borderColor'
      )} font-custom-content tracking-wider`}
    >
      {task.content}
    </div>
  )
}

export default Content
