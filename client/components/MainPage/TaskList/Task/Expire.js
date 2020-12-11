/* eslint-disable no-console */
import React from 'react'
import { useTranslation } from 'react-i18next'
import getFieldData from '../../../addons/getFieldData'

const Expire = (props) => {
  const { t } = useTranslation()
  const { task } = props
  const exp = new Date(task.expiredAt) > new Date() ? 'notExpired' : 'expired'
  const formatDate = (date) => {
    if (String(date).length < 2) {
      return '0'.concat(String(date))
    }
    return date
  }

  return (
    <div
      className={`my-auto ml-2 mt-2
      ${getFieldData(task.status, 'Expire', exp, 'fontSize')}
      ${getFieldData(task.status, 'Expire', exp, 'fontColor')}`}
    >
      {t('task.expired')}:{' '}
      {`${formatDate(new Date(task.expiredAt).getDate())}:${formatDate(
        new Date(task.expiredAt).getMonth() + 1
      )}:${new Date(task.expiredAt).getFullYear()}`}
    </div>
  )
}

export default Expire
