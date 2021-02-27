import jwt from 'jsonwebtoken'
import User from '../model/User.model'
import config from '../config'

export async function login(req, res) {
  try {
    const user = await User.findAndValidateUser(req.body)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function tryLogin(req, res) {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function registration(req, res) {
  const user = await User.findOne({ username: req.body.username })
  if (user === null) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      fullname: req.body.username
    })
    newUser.save()
    delete newUser.password
    res.json({ status: 'user is added', newUser })
  } else {
    res.json({ status: 'user is exist, not added' })
  }
}

export async function updateUser(req, res) {
  try {
    const user = await User.updateOne(
      { _id: req.params.id },
      { $set: { [req.body.field]: req.body.data } }
    )
    res.json({ status: 'ok', user })
  } catch (err) {
    res.json({ status: 'updata error', err })
  }
}
