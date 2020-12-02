/* eslint-disable no-console */
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import GroupButton from './GroupButton'
import ui from '../../UI/config.ui'
import useOutsideAlerter from '../../addons/hooks'
import GroupIcon from './GroupIcon'

const GroupSelector = (props) => {
  const { t } = useTranslation()
  const { groupList, activeGroupID } = useSelector((s) => s.groups)
  const [selectedGroup, setSelectedGroup] = useState(
    (() => {
      if (activeGroupID === '' || groupList.length === 0) {
        return ''
      }
      if (typeof groupList.find((group) => group._id === activeGroupID) === 'undefined') {
        return ''
      }
      return groupList.find((group) => group._id === activeGroupID).name
    })()
  )
  const [isDropdownShown, setIsDropdownShown] = useState(false)
  const wrapperRef = useRef(null)
  const escFunction = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsDropdownShown(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])

  useOutsideAlerter(wrapperRef, setIsDropdownShown)

  return (
    <div
      className={`relative w-1/2
        ${ui.header.GroupSelector.bgColor}
        ${ui.header.GroupSelector.fontSize}
        ${ui.header.GroupSelector.fontColor}`}
    >
      <button
        className="flex items-center"
        type="button"
        onClick={() => {
          setIsDropdownShown(!isDropdownShown)
        }}
      >
        <div className="whitespace-nowrap">
          {activeGroupID === '' ? t('header.GroupSelector') : ''}
        </div>
        <div className="max-h-12 w-full overflow-auto">{selectedGroup}</div>
        <div className="flex-shrink-0">
          <GroupIcon />
        </div>
      </button>
      {isDropdownShown && (
        <div
          ref={wrapperRef}
          className="absolute w-60 flex flex-col space-y-1 bg-gray-600 bg-opacity-75 border border-gray-400 rounded-sm p-1"
        >
          {groupList
            .filter((group) => group.usersID.includes(props.user._id))
            .map((group) => {
              return (
                <div className="flex flex-col" key={group._id}>
                  <GroupButton
                    setSelectedGroup={setSelectedGroup}
                    group={group}
                    isDropdownShown={isDropdownShown}
                    setIsDropdownShown={setIsDropdownShown}
                  />
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default GroupSelector
