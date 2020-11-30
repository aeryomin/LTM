/* eslint-disable no-console */
import React from 'react'
import { useSelector } from 'react-redux'
import Title from './Title'
import ButtonContainer from './ButtonContainer/ButtonContainer'
import Executor from './Executor'
import Content from './Content'
import Expire from './Expire'
import Info from './Info'
import Status from './Status'
import getFieldData from '../../../addons/getFieldData'

const Task = (props) => {
  const task = props
  const { user } = useSelector((s) => s.auth)

  return (
    <div>
      {(task.creator === user.username || task.executor === user.username) && (
        <div
          className={`w-auto mx-4 mb-2 border rounded-md shadow-lg
            ${getFieldData(task.status, 'bgColor')}
            ${getFieldData(task.status, 'bgOpacity')}
            ${getFieldData(task.status, 'borderColor')}`}
        >
          <div className="flex justify-between ml-2 mr-1 my-1 w-auto">
            <div className="flex flex-col w-auto items-start justify-start space-y-1">
              <Executor task={task} user={user} />
            </div>
            <ButtonContainer {...task} />
          </div>
          <Title task={task} />
          {task.content !== '' && <Content task={task} />}
          {task.expiredAt !== null && <Expire task={task} />}
          <div className="flex justify-between mx-2 mt-2">
            <Info task={task} />
            <Status task={task} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Task
