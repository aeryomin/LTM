import jwt from 'jsonwebtoken'
import User from '../model/User.model'

export const regServices = {
  createUserInstance: (username, email, password, fullName) => {
    const newUser = new User({
      username,
      email,
      password,
      fullName
    })
    newUser.save()

    return newUser
  }
}

export const userDataServices = {
  validateUser: async (credentials) => {
    const user = await User.findAndValidateUser(credentials)
    return user
  },
  createToken: (payload, secret) => {
    const token = jwt.sign(payload, secret, { expiresIn: '48h' })
    return token
  },
  verifyUser: (token, secret) => {
    const jwtUser = jwt.verify(token, secret)
    return jwtUser
  },
  findUser: async (username) => {
    const user = await User.findOne({ username })
    return user
  },
  findUserById: async (id) => {
    const user = await User.findById(id)
    return user
  },
  updateUser: async (id, field, data) => {
    const user = await User.updateOne({ _id: id }, { $set: { [field]: data } })
    return user
  }
}
