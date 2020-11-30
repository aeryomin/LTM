import React from 'react'
import { useTranslation } from 'react-i18next'
import ui from '../../UI/config.ui'

const GroupList = () => {
  const { t } = useTranslation()

  return (
    <div className={`ml-4 my-2 ${ui.groups.title.fontSize} ${ui.groups.title.fontColor}`}>
      {t('header.Menu.Groups.GroupList.GroupListTitle.title')}
    </div>
  )
}

export default GroupList
