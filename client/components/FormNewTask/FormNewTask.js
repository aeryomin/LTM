/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getAuthenticatedUsers } from '../../redux/reducers/users'
import { setCreator, setGroupID } from '../../redux/reducers/form'
import DropdownSelectUser from './DropdownSelectUser'
import InputTitle from './InputTitle'
import InputContent from './InputContent'
// import InputExpirationData from './InputExpirationData'
import ButtonFormAction from './ButtonFormAction/ButtonFormAction'
import ui from '../UI/config.ui'

const FormNewTask = () => {
  const dispatch = useDispatch()
  const { username } = useSelector((s) => s.auth.user)
  const { authenticatedUsers } = useSelector((s) => s.users)
  const { groupList, activeGroupID } = useSelector((s) => s.groups)
  const { isFormEdit } = useSelector((s) => s.form)
  const { t } = useTranslation()

  const usersIDInActiveGroup = groupList.find((group) => group._id === activeGroupID).usersID
  const usersFiltered = authenticatedUsers.filter((user) => usersIDInActiveGroup.includes(user._id))

  const InputExpirationData = React.lazy(() => import('./InputExpirationData'))
  const InputExpirationDataSuspended = () => (
    <Suspense fallback="Loading...">
      <InputExpirationData />
    </Suspense>
  )

  useEffect(() => {
    dispatch(getAuthenticatedUsers())
    dispatch(setCreator(username))
    dispatch(setGroupID(activeGroupID))
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 z-20">
      <div
        className={`absolute flex flex-col ${ui.FormNewTask.bgColor} bg-opacity-75 w-11/12 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-700 rounded-md p-4`}
      >
        <DropdownSelectUser users={usersFiltered} />
        <div>
          <InputTitle />
          <InputContent />
          {/* <InputExpirationData /> */}
          <InputExpirationDataSuspended />
        </div>
        <div className="flex justify-around">
          {isFormEdit ? (
            <ButtonFormAction action="update" content={t('formNewTask.buttonFormAction.update')} />
          ) : (
            <ButtonFormAction action="create" content={t('formNewTask.buttonFormAction.create')} />
          )}
          <ButtonFormAction action="cancel" content={t('formNewTask.buttonFormAction.cancel')} />
        </div>
      </div>
    </div>
  )
}

export default FormNewTask
