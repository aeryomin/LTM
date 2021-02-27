import axios from 'axios'

const USER = {
  POST: {
    LOGIN: '/api/v1/auth',
    REGISTRATION: '/api/v1/auth/registration'
  },
  GET: {
    GET_USER: '/api/v1/auth',
    TRY_LOGIN: '/api/v1/auth'
  },
  FETCH: {
    UPDATE_USER: '/api/v1/auth'
  }
}

const errorsHandler = (err) => {
  if (err.response) {
    // eslint-disable-next-line no-console
    console.log('err.response', err.response.data)
  } else if (err.request) {
    // eslint-disable-next-line no-console
    console.log('err.request', err.request)
  }
  return err
}

export default {
  getUserFetch: async (id) => {
    try {
      const response = await axios(`${USER.GET.GET_USER}/${id}`)
      return response.data
    } catch (err) {
      errorsHandler(err)
    }
    return ''
  },
  updateUserFetch: async (id, field, data) => {
    try {
      await axios.patch(`${USER.FETCH.UPDATE_USER}/${id}`, { field, data })
    } catch (err) {
      errorsHandler(err)
    }
    return ''
  }
  // loginFetch: async (email, password) => {
  //   try {
  //     const response = await axios.post(ACCOUNT.POST.LOGIN, { email, password })
  //     return response.data
  //   } catch (err) {
  //     errorsHandler(err)
  //   }
  //   return ''
  // },
  // tryLogInFetch: async () => {
  //   try {
  //     const response = await axios(ACCOUNT.GET.TRY_LOGIN)
  //     return response.data
  //   } catch (err) {
  //     errorsHandler(err)
  //   }
  //   return ''
  // },
  // registrationFetch: async (username, email, password) => {
  //   try {
  //     const response = await axios.post(ACCOUNT.POST.REGISTRATION, {
  //       username,
  //       email,
  //       password
  //     })
  //     return response.data
  //   } catch (err) {
  //     errorsHandler(err)
  //   }
  //   return ''
  // }
}
