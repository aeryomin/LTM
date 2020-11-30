/* eslint-disable no-console */
import React from 'react'
import { useTranslation } from 'react-i18next'

const Input = (props) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      <label htmlFor="inputGroup" className="text-xs mb-1">
        {t('header.Menu.Groups.FindUser.Input.label')}:
      </label>
      <input
        className="text-gray-800"
        type="text"
        id="inputGroup"
        value={props.value}
        onChange={(event) => {
          props.setValue(event.target.value)
        }}
        onKeyPress={(event) => {
          switch (event.key) {
            case 'Enter': {
              event.preventDefault()
              props.action(props.value)
              props.setValue('')
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
