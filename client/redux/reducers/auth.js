/* eslint-disable no-console */
import Cookies from 'universal-cookie'
import store, { history } from '../index'

const UPDATE_USERNAME = 'UPDATE_USERNAME'
const UPDATE_EMAIL = 'UPDATE_EMAIL'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'
const REGISTRATION = 'REGISTRATION'
const GET_USER = 'GET_USER'
const SET_EMAIL_VALID_COLOR = 'SET_EMAIL_VALID_COLOR'
const SET_IS_EMAIL_VALID = 'SET_IS_EMAIL_VALID'

const cookies = new Cookies()

const initialState = {
  username: '',
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {},
  emailValidColor: 'gray',
  isEmailValid: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USERNAME: {
      return { ...state, username: action.username }
    }
    case UPDATE_EMAIL: {
      return { ...state, email: action.email }
    }
    case UPDATE_PASSWORD: {
      return { ...state, password: action.password }
    }
    case LOGIN: {
      return { ...state, token: action.token, username: '', password: '', user: action.user }
    }
    case REGISTRATION: {
      return { ...state, username: '', password: '' }
    }
    case GET_USER: {
      return { ...state, user: action.user }
    }
    case SET_EMAIL_VALID_COLOR: {
      return { ...state, emailValidColor: action.emailValidColor }
    }
    case SET_IS_EMAIL_VALID: {
      return { ...state, isEmailValid: action.isEmailValid }
    }

    default:
      return state
  }
}

export function getUser(userID) {
  return (dispatch) => {
    fetch(`/api/v1/user/${userID}`)
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: GET_USER, user: data.user })
      })
  }
}

export function updateLoginField(username) {
  return { type: UPDATE_USERNAME, username }
}

export function updateEmailField(email) {
  return { type: UPDATE_EMAIL, email }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function testIsEmailValid(email) {
  const reg = /^([A-z0-9._+-]+)@([A-z0-9_+-]+)\.([A-z]{2,})/
  if (email === '' || !reg.test(email)) {
    console.log(reg.test(email))
    return { type: SET_IS_EMAIL_VALID, isEmailValid: false }
  }
  return { type: SET_IS_EMAIL_VALID, isEmailValid: true }
}

export function setEmailValidColor() {
  const { isEmailValid } = store.getState().auth
  if (isEmailValid) return { type: SET_EMAIL_VALID_COLOR, emailValidColor: 'green' }
  return { type: SET_EMAIL_VALID_COLOR, emailValidColor: 'red' }
}

export function registrateUser() {
  return (dispatch, getState) => {
    const { username, email, password, isEmailValid } = getState().auth
    if (isEmailValid) {
      fetch('/api/v1/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })
        .then((r) => r.json())
        .then(() => {
          dispatch({ type: REGISTRATION })
          history.push('/login')
        })
    }
  }
}

export function signIn() {
  return (dispatch, getState) => {
    const { username, password } = getState().auth
    fetch('/api/v1/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user })
        history.push('/main-page')
      })
  }
}

export function trySignIn() {
  return (dispatch) => {
    fetch('/api/v1/auth')
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user })
        history.push('/main-page')
      })
  }
}

export function updateUser(userID, field, data) {
  return fetch(`/api/v1/user/${userID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ field, data })
  })
}
