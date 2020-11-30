/* eslint-disable no-console */
import React from 'react'
import { useSelector } from 'react-redux'
import usePortal from 'react-useportal'
import { useTranslation } from 'react-i18next'
import { addUserToGroup } from '../../../../redux/reducers/groups'
import ui from '../../../UI/config.ui'
import Modal from '../../../addons/modal'

const AddUserButton = (props) => {
  const { t } = useTranslation()
  const { groupList, activeGroupID } = useSelector((s) => s.groups)
  const { ref, openPortal, closePortal, isOpen, Portal } = usePortal({
    bindTo: document && document.getElementById('root')
  })

  return (
    <div className="flex justify-center items-center w-1/4 border border-gray-400 rounded-md">
      <button
        ref={ref}
        className={`w-full h-full px-1
                  ${ui.groups.AddButton.active.fontColor}
                  ${ui.groups.AddButton.active.fontSize}
                  hover:${ui.groups.AddButton.hover.fontColor}
                  hover:${ui.groups.AddButton.hover.fontSize}
                  hover:${ui.groups.AddButton.hover.bgColor}
                  hover:${ui.groups.AddButton.hover.bgOpacity}`}
        type="button"
        onClick={() => {
          const { usersID } = groupList.find((group) => group._id === activeGroupID)
          if (!usersID.includes(props.user._id)) {
            addUserToGroup(props.user._id)
            props.setIsFindUserShow(false)
          } else {
            openPortal()
          }
        }}
      >
        {t('header.Menu.Groups.FindUser.AddUserButton.content')}
      </button>
      {isOpen && (
        <Portal>
          <Modal content="User exists" closePortal={closePortal} />
        </Portal>
      )}
    </div>
  )
}

export default AddUserButton
