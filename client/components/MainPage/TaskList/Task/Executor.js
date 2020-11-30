/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import getFieldData from '../../../addons/getFieldData'

const Executor = (props) => {
  const { task } = props
  const [executorFullname, setExecutorFullname] = useState('')
  const { authenticatedUsers } = useSelector((s) => s.users)

  useEffect(() => {
    setExecutorFullname(authenticatedUsers.find((user) => user.username === task.executor).fullname)
  }, [task])

  return (
    <div
      className={` pr-2 pt-1 ${getFieldData(task.status, 'executor', 'fontSize')} ${getFieldData(
        task.status,
        'executor',
        'fontColor'
      )}`}
    >
      {executorFullname}:
    </div>
  )
}

export default Executor
