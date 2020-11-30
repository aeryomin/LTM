/* eslint-disable no-console */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setExecutor } from '../../redux/reducers/form'
import ui from '../UI/config.ui'

const DropdownSelectUser = (props) => {
  const { users } = props
  const dispatch = useDispatch()
  const { isFormEdit, newTaskData } = useSelector((s) => s.form)
  const [isDropdownShown, setIsDropdownShown] = useState(false)
  const { t } = useTranslation()
  const [selectedUser, setSelectedUser] = useState(
    isFormEdit
      ? users.find((user) => user.username === newTaskData.executor).fullname
      : t('formNewTask.dropdown.user')
  )

  return (
    <div className="relative w-auto">
      <div
        className={`mb-1
          ${ui.FormNewTask.DropdownSelectUser.fontSize}
          ${ui.FormNewTask.DropdownSelectUser.fontColor}`}
      >
        {t('formNewTask.dropdown.whom')}
      </div>
      <div className="w-full mb-2">
        <button
          className={`w-full h-8 border rounded
            ${ui.FormNewTask.DropdownSelectUser.button.active.bgColor}
            hover:${ui.FormNewTask.DropdownSelectUser.button.hover.bgColor}
            ${ui.FormNewTask.DropdownSelectUser.button.active.fontColor}
            ${ui.FormNewTask.DropdownSelectUser.button.active.fontSize}`}
          type="button"
          onClick={() => {
            setIsDropdownShown(!isDropdownShown)
          }}
        >
          {selectedUser}
        </button>
        {isDropdownShown && (
          <div className="absolute flex flex-col space-y-1 border border-gray-300 rounded bg-white w-full">
            {users.map((user) => {
              return (
                <div key={user._id}>
                  <button
                    type="button"
                    className={`w-full h-8 border border-gray-300 rounded
                      ${ui.FormNewTask.DropdownSelectUser.listButton.active.bgColor}
                      hover:${ui.FormNewTask.DropdownSelectUser.listButton.hover.bgColor}
                      ${ui.FormNewTask.DropdownSelectUser.listButton.active.fontColor}`}
                    onClick={() => {
                      setSelectedUser(user.fullname)
                      dispatch(setExecutor(user.username))
                      setIsDropdownShown(!isDropdownShown)
                    }}
                  >
                    {user.fullname}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default DropdownSelectUser
