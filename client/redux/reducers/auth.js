/* eslint-disable no-console */
import Cookies from 'universal-cookie'
import { history } from '../index'

const UPDATE_USERNAME = 'UPDATE_USERNAME'
const UPDATE_EMAIL = 'UPDATE_EMAIL'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'
const REGISTRATION = 'REGISTRATION'
const GET_USER = 'GET_USER'

const cookies = new Cookies()

const initialState = {
  username: '',
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {}
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

export function registrateUser() {
  return (dispatch, getState) => {
    const { username, email, password } = getState().auth
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
