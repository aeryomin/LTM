/* eslint-disable func-names */
/* eslint-disable no-console */
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    fullname: {
      type: String,
      default: ''
    },
    role: {
      type: [String],
      default: ['user']
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    groups: [String]
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password)

  return next()
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ username, password }) {
    if (!username) {
      throw new Error('No User')
    }
    if (!password) {
      throw new Error('No Password')
    }

    const user = await this.findOne({ username }).exec()
    if (!user) {
      throw new Error('No User in DB')
    }

    const isPasswordOk = await user.passwordMatches(password)

    if (!isPasswordOk) {
      throw new Error('PasswordIncorrect')
    }
    return user
  }
}

export default mongoose.model('users', userSchema)
