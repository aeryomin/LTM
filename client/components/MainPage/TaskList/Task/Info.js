import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import getFieldData from '../../../addons/getFieldData'

const Info = (props) => {
  const { task } = props
  const [creatorFullname, setCreatorFullname] = useState('')
  const { authenticatedUsers } = useSelector((s) => s.users)
  const { t } = useTranslation()

  useEffect(() => {
    setCreatorFullname(authenticatedUsers.find((user) => user.username === task.creator).fullname)
  }, [task])

  return (
    <div
      className={`my-auto ${getFieldData(task.status, 'info', 'fontSize')} ${getFieldData(
        task.status,
        'info',
        'fontColor'
      )}`}
    >
      <div>
        {t('task.created')}
        {/* {`${task.creator} `} */}
        {creatorFullname}{' '}
        {new Date(task.createdAt).toLocaleString('ru', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        })}
      </div>
    </div>
  )
}

export default Info
