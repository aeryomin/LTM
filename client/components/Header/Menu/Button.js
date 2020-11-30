/* eslint-disable no-console */
import React from 'react'
import Cookies from 'universal-cookie'
import { history } from '../../../redux'

const Button = (props) => {
  const onClickHandler = () => {
    switch (props.action) {
      case 'groups': {
        history.push('/groups')
        props.setMenuAppearance('hidden')
        break
      }
      case 'profile': {
        history.push('/profile')
        props.setMenuAppearance('hidden')
        break
      }
      case 'tasks': {
        history.push('/main-page')
        props.setMenuAppearance('hidden')
        break
      }
      case 'logout': {
        const cookie = new Cookies()
        history.push('/main-page')
        window.location.reload()
        cookie.remove('token')
        break
      }
      case 'change language': {
        props.i18n.changeLanguage(props.i18n.language === 'ru' ? 'en' : 'ru')
        props.setMenuAppearance('hidden')

        break
      }
      default:
        break
    }
  }

  return (
    <button className="hover:underline whitespace-nowrap" type="button" onClick={onClickHandler}>
      {props.content}
    </button>
  )
}

export default Button
