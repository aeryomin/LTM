import React from 'react'
import { useTranslation } from 'react-i18next'
import ui from '../../UI/config.ui'

const Input = (props) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      <label
        className={`${ui.groups.Input.label.fontSize} ${ui.groups.Input.label.fontColor}`}
        htmlFor="inputGroup"
      >
        {t('header.Menu.Groups.CreatGroup.Input.label')}:
      </label>
      <input
        className={`${ui.groups.Input.input.fontSize} ${ui.groups.Input.input.fontColor}`}
        type="text"
        id="inputGroupCreate"
        value={props.inputValue}
        onChange={(event) => {
          props.setInputValue(event.target.value)
        }}
        onKeyPress={(event) => {
          switch (event.key) {
            case 'Enter': {
              event.preventDefault()
              props.action()
              props.setInputValue('')
              break
            }
            default:
              break
          }
        }}
      />
    </div>
  )
}

export default Input
