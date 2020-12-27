import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setActiveGroupID } from '../../../redux/reducers/groups'
import { setSelectedUserID } from '../../../redux/reducers/users'
import ui from '../../UI/config.ui'

const SelectGroupButton = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  return (
    <button
      type="button"
      className={`flex flex-col w-4/6 space-y-1 border rounded pl-2 text-left
        ${ui.groups.SelectButton.active.bgColor}
        ${ui.groups.SelectButton.active.fontSize}
        ${ui.groups.SelectButton.active.fontColor}
        hover:${ui.groups.SelectButton.hover.bgColor}
        hover:${ui.groups.SelectButton.hover.fontColor}`}
      onClick={() => {
        props.setSelectedGroupID(props.group._id)
        dispatch(setActiveGroupID(props.group._id))
        dispatch(setSelectedUserID(''))
      }}
    >
      <div className="">{props.group.name}</div>
      <div>
        {(() => {
          const date = new Date(props.group.createdAt)
          return (
            <div
              className={`
                ${ui.groups.SelectButton.info.fontSize}
                ${ui.groups.SelectButton.info.fontColor}
        `}
            >
              {t('header.Menu.Groups.GroupList.SelectGroupButton.created')}:{' '}
              {`${date.getDate()}:${date.getMonth()}:${date.getFullYear()}`}
            </div>
          )
        })()}
      </div>
    </button>
  )
}

export default SelectGroupButton
