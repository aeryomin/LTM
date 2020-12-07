/* eslint-disable no-console */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  updateLoginField,
  updateEmailField,
  updatePasswordField,
  signIn,
  registrateUser,
  testIsEmailValid,
  setEmailValidColor
} from '../redux/reducers/auth'
import Header from './Header/Header'
import { history } from '../redux'

const LogRegForm = (props) => {
  const dispatch = useDispatch()
  const { username, email, password, emailValidColor, isEmailValid } = useSelector((s) => s.auth)
  const { t } = useTranslation()

  return (
    <div className="w-screen h-screen bg-custom-login bg-cover">
      <Header />
      <div className="relative w-auto h-custom-95vh flex justify-center">
        <div className=" w-full flex flex-col justify-start">
          <div className="w-auto mt-10 mb-24 text-gray-500 text-2xl md:text-4xl text-center">
            {t('LogRegForm.title')}
          </div>
          <form className="w-11/12 md:w-5/12 mx-auto bg-gray-800 bg-opacity-75 rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-200 text-sm mb-2" htmlFor="username">
                {t('LogRegForm.username.label')}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  dispatch(updateLoginField(e.target.value))
                }}
              />
            </div>
            {props.action === 'registration' && (
              <div className="mb-6">
                <label className="block text-gray-200 text-sm mb-2" htmlFor="password">
                  E-mail
                </label>
                <input
                  className={`shadow appearance-none border border-${emailValidColor}-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id="email"
                  type="email"
                  placeholder="user@mail.com"
                  value={email}
                  onChange={(e) => {
                    dispatch(updateEmailField(e.target.value))
                    dispatch(testIsEmailValid(e.target.value))
                    dispatch(setEmailValidColor())
                  }}
                />
                {(() => {
                  if (isEmailValid) {
                    return (
                      <div className={`pt-2 text-${emailValidColor}-600 text-xs italic`}>
                        Email is OK
                      </div>
                    )
                  }
                  return (
                    <div className={`pt-2 text-${emailValidColor}-500 text-xs italic`}>
                      Email is Wrong
                    </div>
                  )
                })()}
              </div>
            )}
            <div className="mb-6">
              <label className="block text-gray-200 text-sm mb-2" htmlFor="password">
                {t('LogRegForm.password.label')}
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => {
                  dispatch(updatePasswordField(e.target.value))
                }}
              />
              {password === '' && (
                <p className="text-red-500 text-xs italic">{t('LogRegForm.password.paragraph')}</p>
              )}
            </div>

            <div className="">
              {(() => {
                switch (props.action) {
                  case 'login': {
                    return (
                      <div className="flex items-center justify-between mx-6">
                        <button
                          className="border rounded hover:bg-gray-600 text-white py-2 px-4 focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={() => {
                            dispatch(signIn())
                          }}
                        >
                          {t('LogRegForm.button.login')}
                        </button>
                        <button
                          className="text-sm text-gray-200 hover:text-gray-500"
                          type="button"
                          onClick={() => {
                            history.push('/reg')
                          }}
                        >
                          {t('LogRegForm.button.registration')}
                        </button>
                      </div>
                    )
                  }
                  case 'registration': {
                    return (
                      <div className="flex items-center justify-between">
                        <button
                          className="border border-white hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={() => {
                            registrateUser()
                          }}
                        >
                          {t('LogRegForm.button.registration')}
                        </button>
                        <button
                          className="border border-white hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={() => {
                            history.push('/login')
                          }}
                        >
                          {t('LogRegForm.button.cancel')}
                        </button>
                      </div>
                    )
                  }
                  default:
                    return ''
                }
              })()}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LogRegForm
