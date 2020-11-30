import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setActiveGroupID, removeGroup } from '../../../redux/reducers/groups'
import ui from '../../UI/config.ui'

const RemoveGroupButton = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <button
      className={`block w-full ml-2 space-x-1 border border-gray-400 rounded-md px-1
        ${ui.groups.RemoveButton.active.fontColor}
        ${ui.groups.RemoveButton.active.fontSize}
        hover:${ui.groups.RemoveButton.hover.fontColor}
        hover:${ui.groups.RemoveButton.hover.fontSize}
        hover:${ui.groups.RemoveButton.hover.bgColor}
        hover:${ui.groups.RemoveButton.hover.bgOpacity}`}
      type="button"
      onClick={() => {
        removeGroup()
        dispatch(setActiveGroupID(''))
      }}
    >
      <div>{t('header.Menu.Groups.GroupList.RemoveGroupButton.content')}</div>
    </button>
  )
}

export default RemoveGroupButton
