/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Task from './Task/Task'
import { getTasklist, setTasklistToRender } from '../../../redux/reducers/tasks'
import { getGrouplist } from '../../../redux/reducers/groups'
import { getAuthenticatedUsers } from '../../../redux/reducers/users'

const TaskList = () => {
  const dispatch = useDispatch()
  const { tasklist, tasklistToRender, filterOption, overflowYScroll } = useSelector((s) => s.tasks)

  useEffect(() => {
    dispatch(getTasklist())
    dispatch(getGrouplist())
    dispatch(getAuthenticatedUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(setTasklistToRender(filterOption))
  }, [dispatch, tasklist, filterOption])

  return (
    <div className={`mt-2 py-2 flex-grow max-h-custom-80vh ${overflowYScroll}`}>
      {tasklistToRender.map((task) => (
        <Task key={task._id} {...task} />
      ))}
    </div>
  )
}

export default TaskList
