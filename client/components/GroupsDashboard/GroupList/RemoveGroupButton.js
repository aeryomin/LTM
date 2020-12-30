import React from 'react'
import usePortal from 'react-useportal'
import { useTranslation } from 'react-i18next'
import { setActiveGroupID, removeGroup } from '../../../redux/reducers/groups'
import WarningModal from '../../addons/warning-modal'
import ui from '../../UI/config.ui'

const RemoveGroupButton = () => {
  const { t } = useTranslation()
  const { ref, openPortal, closePortal, isOpen, Portal } = usePortal({
    bindTo: document && document.getElementById('root')
  })

  return (
    <div ref={ref} className="w-full h-full">
      <button
        className={`block w-full h-full space-x-1 border border-gray-400 rounded-md px-1
    ${ui.groups.RemoveButton.active.fontColor}
    ${ui.groups.RemoveButton.active.fontSize}
    hover:${ui.groups.RemoveButton.hover.fontColor}
    hover:${ui.groups.RemoveButton.hover.fontSize}
    hover:${ui.groups.RemoveButton.hover.bgColor}
    hover:${ui.groups.RemoveButton.hover.bgOpacity}`}
        type="button"
        onClick={() => {
          return openPortal()
        }}
      >
        {t('header.Menu.Groups.GroupList.RemoveGroupButton.content')}
      </button>
      {isOpen && (
        <Portal>
          <WarningModal
            content="warningContent"
            closePortal={closePortal}
            action1={removeGroup}
            action2={setActiveGroupID}
          />
        </Portal>
      )}
    </div>
  )
}

export default RemoveGroupButton
