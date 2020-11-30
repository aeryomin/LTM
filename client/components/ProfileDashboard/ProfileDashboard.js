/* eslint-disable no-console */
import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import ActionButton from './ActionButton'
import InputField from './InputField'

const ProfileDashboard = () => {
  const { t } = useTranslation()
  const { user } = useSelector((s) => s.auth)
  const [isFullnameEdit, setIsFullnameEdit] = useState(false)
  const [isEmailEdit, setIsEmailEdit] = useState(false)
  const [buttonValue, setButtonValue] = useState('')

  const escFunction = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsFullnameEdit(false)
      setIsEmailEdit(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-lg w-screen px-2 my-4 ">
        <table className="w-full table-fixed border-collapse text-white bg-gray-600 bg-opacity-75">
          <tbody>
            <tr>
              <td className="w-1/3 border border-gray-400 pl-1">
                {t('header.Menu.Profile.ProfileDashboard.login')}
              </td>
              <td className="w-2/3 border border-gray-400 pl-1">{user.username}</td>
            </tr>
            <tr>
              <td className="border border-gray-400 pl-1">
                {t('header.Menu.Profile.ProfileDashboard.fullname')}
              </td>
              <td className="border border-gray-400">
                {isFullnameEdit ? (
                  <div className="flex justify-between items-center">
                    <InputField
                      user={user}
                      field="fullname"
                      setButtonValue={setButtonValue}
                      isEdit={isFullnameEdit}
                      setIsEdit={setIsFullnameEdit}
                    />
                    <ActionButton
                      user={user}
                      field="fullname"
                      buttonValue={buttonValue}
                      isEdit={isFullnameEdit}
                      setIsEdit={setIsFullnameEdit}
                      content="Save"
                    />
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="w-4/5 px-1 whitespace-nowrap overflow-x-auto">
                      {user.fullname}
                    </div>
                    <ActionButton
                      user={user}
                      isEdit={isFullnameEdit}
                      setIsEdit={setIsFullnameEdit}
                      content="Edit"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr className="border-collapse">
              <td className="border border-gray-400 pl-1">E-mail</td>
              <td className="border border-gray-400">
                {isEmailEdit ? (
                  <div className="flex justify-between items-center">
                    <InputField
                      user={user}
                      field="email"
                      setButtonValue={setButtonValue}
                      isEdit={isEmailEdit}
                      setIsEdit={setIsEmailEdit}
                    />
                    <ActionButton
                      user={user}
                      field="email"
                      buttonValue={buttonValue}
                      isEdit={isEmailEdit}
                      setIsEdit={setIsEmailEdit}
                      content="Save"
                    />
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="w-4/5 px-1 whitespace-nowrap overflow-x-auto">{user.email}</div>
                    <ActionButton
                      user={user}
                      isEdit={isEmailEdit}
                      setIsEdit={setIsEmailEdit}
                      content="Edit"
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 pl-1">
                {t('header.Menu.Profile.ProfileDashboard.createdAt')}
              </td>
              <td className="whitespace-nowrap overflow-x-auto border border-gray-400 pl-1">
                {new Date(user.createdAt).toLocaleString('ru', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric'
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfileDashboard
