import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import ButtonHideMenu from './ButtonHideMenu'
import Button from './Button'
import ui from '../../UI/config.ui'
import { history } from '../../../redux'

const Menu = (props) => {
  const { menuAppearance, setMenuAppearance } = props
  const auth = useSelector((s) => s.auth)
  const { t, i18n } = useTranslation()

  return (
    <div
      className={`${menuAppearance}
      fixed top-0 right-0 h-screen w-auto z-10 border border-gray-400 px-2 pt-8
      ${ui.header.menu.sm.bgColor}
      ${ui.header.menu.sm.fontColor}
      md:${ui.header.menu.md.bgColor}
      md:${ui.header.menu.md.fontSize}
      md:${ui.header.menu.md.fontColor}
      md:flex md:relative md:h-auto md:w-7/12 md:border-none md:p-0 md:my-auto`}
    >
      <ul
        className={`h-1/3 flex flex-col justify-between divide-y divide-gray-400 text-gray-800 md:text-gray-200 md:w-full md:flex-row md:justify-evenly md:items-center md:space-x-4 md:space-y-0 md:divide-y-0
        md:bg-gray-700`}
      >
        {(history.location.pathname === '/groups' || history.location.pathname === '/profile') && (
          <li className="p-4 md:p-0">
            <Button
              content={t('header.Menu.Tasks')}
              action="tasks"
              setMenuAppearance={setMenuAppearance}
            />
          </li>
        )}
        {(history.location.pathname === '/main-page' ||
          history.location.pathname === '/profile') && (
          <li className="p-4 md:p-0 ">
            <Button
              content={t('header.Menu.Groups.itemName')}
              action="groups"
              setMenuAppearance={setMenuAppearance}
            />
          </li>
        )}
        {(history.location.pathname === '/main-page' ||
          history.location.pathname === '/groups') && (
          <li className="p-4 md:p-0 ">
            <Button
              content={t('header.Menu.Profile.itemName')}
              action="profile"
              setMenuAppearance={setMenuAppearance}
            />
          </li>
        )}

        <li className="p-4 md:p-0">
          <Button
            content={t('header.Menu.language')}
            setMenuAppearance={setMenuAppearance}
            action="change language"
            i18n={i18n}
          />
        </li>
        <li className="p-4 md:p-0">
          {!!auth.user && !!auth.token && (
            <Button content={t('header.Menu.logOut')} action="logout" />
          )}
        </li>
      </ul>
      <ButtonHideMenu setMenuAppearance={setMenuAppearance} />
    </div>
  )
}

export default Menu
