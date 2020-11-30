/* eslint-disable no-console */
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getAuthenticatedUsers } from '../../../redux/reducers/users'
import UserList from './UserList/UserList'
import Button from './Button'
import Input from './Input'
import useOutsideAlerter from '../../addons/hooks'

const FindUser = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const { authenticatedUsers } = useSelector((s) => s.users)
  const { groupList, activeGroupID } = useSelector((s) => s.groups)
  const [findResults, setFindResults] = useState([])
  const [isFindButtonPressed, setIsFindButtonPressed] = useState(false)
  const wrapperRef = useRef(null)

  const getFindResults = (email) => {
    setFindResults(authenticatedUsers.filter((user) => user.email === email))
  }

  const escFunction = useCallback((e) => {
    if (e.key === 'Escape') {
      props.setIsFindUserShow(false)
    }
  }, [])

  useOutsideAlerter(wrapperRef, props.setIsFindUserShow)

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])

  useEffect(() => {
    dispatch(getAuthenticatedUsers())
  }, [dispatch])

  return (
    <div className="absolute top-0 w-full h-full bg-black bg-opacity-75 z-30 md:max-w-screen-md md:mx-auto">
      <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2  mx-auto p-2 text-gray-200 border border-gray-600 rounded bg-gray-900 bg-opacity-75">
        <div ref={wrapperRef} className="flex flex-col w-full">
          <div className="flex">
            <div>{t('header.Menu.Groups.FindUser.title')}:</div>
            <div className="underline ml-1">
              {groupList.find((group) => group._id === activeGroupID).name}
            </div>
          </div>
          <div className="w-full flex justify-around my-2">
            <div className="w-2/3">
              <Input
                value={inputValue}
                setValue={setInputValue}
                action={getFindResults}
                setIsFindUserShow={props.setIsFindUserShow}
              />
            </div>
            <Button
              content={t('header.Menu.Groups.FindUser.Button.content')}
              action={getFindResults}
              valueForAction={inputValue}
              setIsFindButtonPressed={setIsFindButtonPressed}
            />
          </div>
          {isFindButtonPressed && (
            <div>
              {findResults.length !== 0 ? (
                <div className="border border-gray-400 rounded">
                  <div className="pl-2">{t('header.Menu.Groups.FindUser.users')}:</div>
                  <UserList
                    findResults={findResults}
                    getFindResults={getFindResults}
                    setIsFindUserShow={props.setIsFindUserShow}
                  />
                </div>
              ) : (
                <div> User not found </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FindUser
