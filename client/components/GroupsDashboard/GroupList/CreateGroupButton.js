import React from 'react'
import { useTranslation } from 'react-i18next'

const CreateGroupButton = (props) => {
  const { t } = useTranslation()

  return (
    <div className="w-full flex">
      <button
        className="blockjustify-center justify-items-center mx-auto my-2 p-2 bg-opacity-75 border rounded border-gray-200 hover:bg-gray-600 hover:bg-opacity-75"
        type="button"
        onClick={() => {
          props.setIsCreateGroupShown(!props.isCreateGroupShown)
        }}
      >
        {t('header.Menu.Groups.GroupList.CreateGroupButton.content')}
      </button>
    </div>
  )
}

export default CreateGroupButton
