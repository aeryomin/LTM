/* eslint-disable no-console */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import usePortal from 'react-useportal'
import { toggleDispayForm } from '../../../redux/reducers/form'
import { setOverflowYScroll } from '../../../redux/reducers/tasks'
import ui from '../../UI/config.ui'
import Modal from '../../addons/modal'

const ButtonNewTask = () => {
  const { activeGroupID } = useSelector((s) => s.groups)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { ref, openPortal, closePortal, isOpen, Portal } = usePortal({
    bindTo: document && document.getElementById('root')
  })

  return (
    <div
      className={`w-auto h-10 leading-10 m-auto border rounded-md ${ui.footer.ButtonNewTask.active.bgColor} hover:${ui.footer.ButtonNewTask.hover.bgColor} hover:bg-opacity-50 text-white text-center px-4`}
    >
      <button
        ref={ref}
        type="button"
        onClick={() => {
          if (activeGroupID !== '') {
            dispatch(toggleDispayForm())
            dispatch(setOverflowYScroll('overflow-hidden'))
          } else {
            openPortal()
          }
        }}
      >
        {t('footer.buttonNewTaskContent')}
      </button>
      {isOpen && (
        <Portal>
          <Modal messageIndicator={t('modal.GroupIsNotSelected')} closePortal={closePortal} />
        </Portal>
      )}
    </div>
  )
}

export default ButtonNewTask
