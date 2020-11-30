import React from 'react'
import { useTranslation } from 'react-i18next'
import getFieldData from '../../../addons/getFieldData'

const Status = (props) => {
  const { task } = props
  const { t } = useTranslation()

  return (
    <div
      className={`my-auto ${getFieldData(task.status, 'status', 'fontSize')} ${getFieldData(
        task.status,
        'content',
        'fontColor'
      )} ${getFieldData(task.status, 'status', 'fontTransform')} ${getFieldData(
        task.status,
        'status',
        'fontColor'
      )}`}
    >
      {(() => {
        switch (task.status) {
          case 'done': {
            return (
              <div className="flex">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"
                    fill="currentColor"
                  />
                </svg>
                {t(`task.status.${task.status}`)}
              </div>
            )
          }
          case 'new': {
            return (
              <div className="flex">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 21H6V11H12V13H20V5H13V3H4V21ZM12 5H6V9H13V11H18V7H12V5Z"
                    fill="currentColor"
                  />
                </svg>
                {t(`task.status.${task.status}`)}
              </div>
            )
          }
          default: {
            return t(`task.status.${task.status}`)
          }
        }
      })()}
    </div>
  )
}

export default Status
