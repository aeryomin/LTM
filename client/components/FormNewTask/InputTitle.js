import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setTitle } from '../../redux/reducers/form'
import ui from '../UI/config.ui'

const InputTitle = () => {
  const dispatch = useDispatch()
  const { newTaskData } = useSelector((s) => s.form)
  const { t } = useTranslation()
  const onChange = (e) => {
    dispatch(setTitle(e.target.value))
  }

  return (
    <div>
      <label
        className={`block ${ui.FormNewTask.InputTitle.label.fontSize} ${ui.FormNewTask.InputTitle.label.fontColor} mb-1`}
        htmlFor="taskTitle"
      >
        {t('formNewTask.inputTitle.label')}
      </label>
      <input
        className={`shadow appearance-none border rounded h-8 w-full mb-2 py-2 px-3
          ${ui.FormNewTask.InputTitle.input.fontColor}
          ${ui.FormNewTask.InputTitle.input.fontSize}
          leading-tight focus:outline-none focus:shadow-outline`}
        type="text"
        id="taskTitle"
        value={newTaskData.title}
        onChange={onChange}
      />
    </div>
  )
}

export default InputTitle
