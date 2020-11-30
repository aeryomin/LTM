/* eslint-disable no-console */
import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Button from './Button'

const ButtonContainer = (props) => {
  const task = props
  const { t } = useTranslation()
  const { username } = useSelector((s) => s.auth.user)

  return (
    <div className="">
      {(() => {
        switch (task.status) {
          case 'active': {
            return (
              <div className="flex justify-end items-center space-x-2">
                <Button
                  action={{ type: 'change DB', field: 'status', fieldContent: 'done' }}
                  buttonContent={t('task.taskButtonAction.done')}
                  task={task}
                />
                <Button
                  action={{ type: 'change DB', field: 'status', fieldContent: 'hold' }}
                  buttonContent={t('task.taskButtonAction.hold')}
                  task={task}
                />
              </div>
            )
          }
          case 'new': {
            return (
              <div className="flex justify-end items-center space-x-2">
                <Button
                  action={{ type: 'change DB', field: 'status', fieldContent: 'active' }}
                  buttonContent={t('task.taskButtonAction.accept')}
                  task={task}
                />
                {task.creator === username && (
                  <div className="flex items-center space-x-2">
                    <Button
                      action={{ type: 'edit task' }}
                      buttonContent={t('task.taskButtonAction.edit')}
                      task={task}
                    />
                    <Button
                      action={{ type: 'change DB', field: 'isDeleted', fieldContent: true }}
                      buttonContent={t('task.taskButtonAction.delete')}
                      task={task}
                    />
                  </div>
                )}
              </div>
            )
          }
          case 'done': {
            return (
              <div>
                {task.creator === username && (
                  <div className="flex justify-end items-center">
                    <Button
                      action={{ type: 'change DB', field: 'isDeleted', fieldContent: true }}
                      buttonContent={t('task.taskButtonAction.delete')}
                      task={task}
                    />
                  </div>
                )}
              </div>
            )
          }
          case 'hold': {
            return (
              <div className="flex justify-end items-center">
                <Button
                  action={{ type: 'change DB', field: 'status', fieldContent: 'active' }}
                  buttonContent={t('task.taskButtonAction.accept')}
                  task={task}
                />
              </div>
            )
          }
          default:
            return ''
        }
      })()}
    </div>
  )
}

export default ButtonContainer
