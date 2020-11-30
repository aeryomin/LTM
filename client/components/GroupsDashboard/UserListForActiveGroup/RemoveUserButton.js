import React from 'react'
import { useTranslation } from 'react-i18next'
import { removeUserToGroup } from '../../../redux/reducers/groups'
import ui from '../../UI/config.ui'

const RemoveUserButton = (props) => {
  const { t } = useTranslation()

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
        removeUserToGroup(props.selectedUserID)
      }}
    >
      {t('header.Menu.Groups.UserListForActiveGroup.RemoveUserButton.content')}
    </button>
  )
}

export default RemoveUserButton
