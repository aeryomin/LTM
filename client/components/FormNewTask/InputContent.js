/* eslint-disable no-console */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  setContent,
  putNewString,
  isContentInLastString,
  clearLastSrting
} from '../../redux/reducers/form'
import { setMarkedList } from '../../redux/reducers/inputContent'
import ui from '../UI/config.ui'

const InputContent = () => {
  const dispatch = useDispatch()
  const { newTaskData } = useSelector((s) => s.form)
  const { isMarkedList } = useSelector((s) => s.inputContent)
  const { t } = useTranslation()

  const onChange = (e) => {
    dispatch(setContent(e.target.value))
  }

  return (
    <div>
      <label
        className={`block
          ${ui.FormNewTask.InputContent.label.fontSize}
          ${ui.FormNewTask.InputContent.label.fontColor}
          mb-1`}
        htmlFor="taskContent"
      >
        {t('formNewTask.inputContent.label')}
      </label>
      <ul className="flex w-full h-8 border rounded text-gray-700 bg-white justify-end items-center space-x-4 pr-2">
        <li className="">
          <button
            type="button"
            className="block"
            onClick={() => {
              dispatch(setMarkedList(true))
              if (!isContentInLastString()) {
                dispatch(putNewString(' - '))
              } else {
                dispatch(putNewString('\n - '))
              }
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 7H7V9H9V7Z" fill="currentColor" />
              <path d="M7 13V11H9V13H7Z" fill="currentColor" />
              <path d="M7 15V17H9V15H7Z" fill="currentColor" />
              <path d="M11 15V17H17V15H11Z" fill="currentColor" />
              <path d="M17 13V11H11V13H17Z" fill="currentColor" />
              <path d="M17 7V9H11V7H17Z" fill="currentColor" />
            </svg>
          </button>
        </li>
        {/* <li className="">
          <button type="button" className="block w-4 h-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16">
              <path
                fillRule="evenodd"
                d="M12 12.99c0 .589 0 .998-.59.998H4.596c-.59 0-.59-.41-.59-.999 0-.59 0-.999.59-.999H11.4c.59 0 .59.41.59 1H12zM4.596 3.996H11.4c.59 0 .59-.41.59-1 0-.589 0-.999-.59-.999H4.596c-.59 0-.59.41-.59 1 0 .589 0 .999.59.999zM11.4 6.994H4.596c-.59 0-.59.41-.59 1 0 .589 0 .999.59.999H11.4c.59 0 .59-.41.59-1 0-.59 0-.999-.59-.999zM2.008 1h-.72C.99 1.19.71 1.25.26 1.34V2h.75v2.138H.17v.859h2.837v-.86h-.999V1zm.25 8.123c-.17 0-.45.03-.66.06.53-.56 1.14-1.249 1.14-1.888-.02-.78-.56-1.299-1.36-1.299-.589 0-.968.2-1.378.64l.58.579c.19-.19.38-.38.639-.38.28 0 .48.16.48.52 0 .53-.77 1.199-1.699 2.058v.58h2.998l-.09-.88h-.66l.01.01zm-.08 3.777v-.03c.44-.19.64-.47.64-.859 0-.7-.56-1.11-1.44-1.11-.479 0-.888.19-1.278.52l.55.64c.25-.2.44-.31.689-.31.27 0 .42.13.42.36 0 .27-.2.44-.86.44v.749c.83 0 .98.17.98.47 0 .25-.23.38-.58.38-.28 0-.56-.14-.81-.38l-.479.659c.3.36.77.56 1.409.56.83 0 1.529-.41 1.529-1.16 0-.5-.31-.809-.77-.939v.01z"
              />
            </svg>
          </button>
        </li> */}
      </ul>
      <textarea
        id="taskContent"
        className={`resize-none shadow appearance-none border rounded h-24 w-full mb-2 py-2 px-3
          ${ui.FormNewTask.InputContent.textarea.fontColor}
          ${ui.FormNewTask.InputContent.textarea.fontSize}
          leading-tight focus:outline-none focus:shadow-outline`}
        type="text"
        value={newTaskData.content}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            if (isMarkedList && isContentInLastString()) {
              dispatch(putNewString('\n - '))
            } else if (isMarkedList && !isContentInLastString()) {
              dispatch(clearLastSrting())
              dispatch(setMarkedList(false))
            } else {
              dispatch(putNewString('\n'))
            }
          }
        }}
      />
    </div>
  )
}

export default InputContent
