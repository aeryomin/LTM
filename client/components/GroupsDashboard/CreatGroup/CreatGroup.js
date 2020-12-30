/* eslint-disable no-console */
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import usePortal from 'react-useportal'
import { creatGroup } from '../../../redux/reducers/groups'
import Button from './Button'
import Input from './Input'
import Modal from '../../addons/modal'
import useOutsideAlerter from '../../addons/hooks'

const CreatGroup = (props) => {
  const { t } = useTranslation()
  const wrapperRef = useRef(null)
  const { currentUser } = props
  const [inputValue, setInputValue] = useState('')
  const { groupList } = useSelector((s) => s.groups)
  const { ref, openPortal, closePortal, isOpen, Portal } = usePortal({
    bindTo: document && document.getElementById('root')
  })

  const escFunction = useCallback((e) => {
    if (e.key === 'Escape') {
      props.setIsCreateGroupShown(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])

  const sendGroupDataToStore = () => {
    const newGroupData = {
      name: inputValue,
      creatorID: currentUser._id,
      usersID: [currentUser._id]
    }

    const groupNamesFromGroupList = groupList.reduce((names, group) => {
      if (group.creatorID === currentUser._id) {
        names.push(group.name)
      }
      return names
    }, [])

    if (!groupNamesFromGroupList.includes(newGroupData.name)) {
      creatGroup(newGroupData)
      props.setIsCreateGroupShown(false)
    } else {
      openPortal()
    }
  }

  useOutsideAlerter(wrapperRef, props.setIsCreateGroupShown)

  // ref={wrapperRef}

  return (
    <div className="absolute top-0 w-full h-full bg-black bg-opacity-75 z-30 md:max-w-screen-md md:mx-auto">
      <div
        ref={wrapperRef}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-full mx-auto p-2 text-gray-600 border border-gray-600 rounded bg-gray-900 bg-opacity-75"
      >
        <div ref={ref} className="w-full flex justify-around my-2">
          <div className="w-2/3">
            <Input
              inputValue={inputValue}
              setInputValue={setInputValue}
              action={sendGroupDataToStore}
            />
          </div>
          <Button
            content={t('header.Menu.Groups.CreatGroup.Button.content')}
            action={sendGroupDataToStore}
          />
        </div>
      </div>
      {isOpen && (
        <Portal>
          <Modal messageIndicator={t('modal.GroupNameIsExist')} closePortal={closePortal} />
        </Portal>
      )}
    </div>
  )
}

export default CreatGroup
