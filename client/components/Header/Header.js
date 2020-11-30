/* eslint-disable no-console */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Username from './Username'
import GroupSelector from './GroupSelector/GroupSelector'
import Filter from './Filter/Filter'
import Sort from './Sort/Sort'
import Menu from './Menu/Menu'
import ButtonShowMenu from './ButtonShowMenu'
import ui from '../UI/config.ui'
import { history } from '../../redux'

const Header = () => {
  const auth = useSelector((s) => s.auth)
  const { user } = useSelector((s) => s.auth)
  const [menuAppearance, setMenuAppearance] = useState('hidden')
  const { t } = useTranslation()

  return (
    <header className={`w-full md:mx-auto h-12 pr-2 flex justify-between ${ui.header.bgColor}`}>
      {!!auth.user &&
        !!auth.token &&
        history.location.pathname !== '/groups' &&
        history.location.pathname !== '/profile' && (
          <div className="flex items-center w-full justify-evenly space-x-3 mx-2 md:w-auto md:space-x-4">
            <GroupSelector user={user} />
            <Filter />
            <Sort />
          </div>
        )}
      {!!auth.user && !!auth.token && history.location.pathname === '/groups' && (
        <div className="flex items-center w-full justify-evenly space-x-3 mx-2 md:w-auto md:space-x-4">
          <Username title={t('header.user')} user={user} />
        </div>
      )}
      {!!auth.user && !!auth.token && history.location.pathname === '/profile' && (
        <div className="flex items-center w-full justify-evenly space-x-3 mx-2 md:w-auto md:space-x-4">
          <Username title={t('header.user')} user={user} />
        </div>
      )}
      <Menu menuAppearance={menuAppearance} setMenuAppearance={setMenuAppearance} />
      <ButtonShowMenu setMenuAppearance={setMenuAppearance} />
    </header>
  )
}

export default Header
