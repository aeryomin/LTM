import React from 'react'
import { useTranslation } from 'react-i18next'
import ui from '../../UI/config.ui'

const UserListTitle = (props) => {
  const { t } = useTranslation()

  return (
    <div
      className={`flex space-x-2 ml-4 my-2 ${ui.groups.title.fontSize} ${ui.groups.title.fontColor}`}
    >
      <div>{t('header.Menu.Groups.UserListForActiveGroup.UserListTitle.title')}</div>
      <div className="underline">
        {props.groupList.find((group) => group._id === props.activeGroupID).name}
        {`:`}
      </div>
    </div>
  )
}

export default UserListTitle
