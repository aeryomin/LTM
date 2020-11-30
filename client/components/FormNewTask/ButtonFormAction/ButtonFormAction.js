/* eslint-disable no-console */
import React from 'react'
import { useSelector } from 'react-redux'
import usePortal from 'react-useportal'
import { sendData, updateData, makeCancel } from './button-functions'
import ui from '../../UI/config.ui'
import Modal from '../../addons/modal'

const ButtonFormAction = (props) => {
  const { newTaskData } = useSelector((s) => s.form)
  const { ref, openPortal, closePortal, isOpen, Portal } = usePortal({
    bindTo: document && document.getElementById('root')
  })

  const actionHandler = () => {
    switch (props.action) {
      case 'create': {
        const result = sendData(newTaskData)
        if (result !== 'done') {
          openPortal()
        }
        return ''
      }
      case 'update': {
        const result = updateData(newTaskData)
        if (result !== 'done') {
          openPortal()
        }
        return ''
      }
      case 'cancel': {
        return makeCancel()
      }
      default:
        return ''
    }
  }

  return (
    <div>
      <button
        ref={ref}
        type="button"
        onClick={actionHandler}
        className={(() => {
          switch (props.action) {
            case 'create':
            case 'update': {
              return `w-auto self-center mt-4 h-10 leading-10 border rounded-md
    ${ui.FormNewTask.ButtonFormAction.buttonCreate.active.bgColor}
    ${ui.FormNewTask.ButtonFormAction.buttonCreate.active.fontColor}
    ${ui.FormNewTask.ButtonFormAction.buttonCreate.active.fontSize}
    hover:${ui.FormNewTask.ButtonFormAction.buttonCreate.hover.bgColor}
    hover:${ui.FormNewTask.ButtonFormAction.buttonCreate.hover.fontColor}
    hover:${ui.FormNewTask.ButtonFormAction.buttonCreate.hover.fontSize}
    text-center px-4`
            }
            case 'cancel': {
              return `w-auto self-center mt-4 h-10 leading-10 border rounded-md
    ${ui.FormNewTask.ButtonFormAction.buttonCancel.active.bgColor}
    ${ui.FormNewTask.ButtonFormAction.buttonCancel.active.fontColor}
    ${ui.FormNewTask.ButtonFormAction.buttonCancel.active.fontSize}
    hover:${ui.FormNewTask.ButtonFormAction.buttonCancel.hover.bgColor}
    hover:${ui.FormNewTask.ButtonFormAction.buttonCancel.hover.fontColor}
    hover:${ui.FormNewTask.ButtonFormAction.buttonCancel.hover.fontSize}
    text-center px-4`
            }
            default:
              return ''
          }
        })()}
      >
        {props.content}
      </button>
      {isOpen && (
        <Portal>
          <Modal content="Form is not filled" closePortal={closePortal} />
        </Portal>
      )}
    </div>
  )
}

export default ButtonFormAction
