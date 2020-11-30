/* eslint-disable no-console */
import React from 'react'
import getFieldData from '../../../addons/getFieldData'

const Expire = (props) => {
  const { task } = props
  const exp = new Date(task.expiredAt) > new Date() ? 'notExpired' : 'expired'

  return (
    <div
      className={`my-auto ml-2 mt-2
      ${getFieldData(task.status, 'Expire', exp, 'fontSize')}
      ${getFieldData(task.status, 'Expire', exp, 'fontColor')}`}
    >
      Expired At:{' '}
      {`${new Date(task.expiredAt).getDate()}:${new Date(task.expiredAt).getMonth()}:${new Date(
        task.expiredAt
      ).getFullYear()}`}
    </div>
  )
}

export default Expire
