import React from 'react'
import { useTranslation } from 'react-i18next'

const AddUserButton = (props) => {
  const { t } = useTranslation()

  return (
    <div className="w-full flex">
      <button
        className="block justify-center justify-items-center mx-auto my-2 p-2 bg-opacity-75 border rounded border-gray-200 hover:bg-gray-600 hover:bg-opacity-75"
        type="button"
        onClick={() => {
          props.setIsFindUserShow(!props.isFindUserShow)
        }}
      >
        {t('header.Menu.Groups.UserListForActiveGroup.AddUserButton.content')}
      </button>
    </div>
  )
}

export default AddUserButton
