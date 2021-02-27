import config from '../config'
import { userDataServices, regServices } from '../services/db'

export async function login(req, res) {
  try {
    const user = await userDataServices.validateUser(req.body)
    const payload = { uid: user.id }
    const token = userDataServices.createToken(payload, config.secret)

    delete user.password

    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function tryLogin(req, res) {
  try {
    const jwtUser = userDataServices.verifyUser(req.cookies.token, config.secret)
    const user = await userDataServices.findUserById(jwtUser.uid)
    const payload = { uid: user.id }
    const token = userDataServices.createToken(payload, config.secret)
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function registration(req, res) {
  const user = await userDataServices.findUser(req.body.username)
  if (user === null) {
    const newUser = regServices.createUserInstance(
      req.body.username,
      req.body.email,
      req.body.password,
      req.body.username
    )
    delete newUser.password
    res.json({ status: 'user is added', newUser })
  } else {
    res.json({ status: 'user is exist, not added' })
  }
}

export async function updateUser(req, res) {
  try {
    const user = await userDataServices.updateUser(req.params.id, req.body.field, req.body.data)
    res.status(200).send(user)
  } catch (err) {
    res.json({ status: 'updata error', err })
  }
}

export async function getUser(req, res) {
  try {
    const user = await userDataServices.findUserById(req.params.id)
    res.status(200).send(user)
  } catch (err) {
    res.json({ status: 'updata error', err })
  }
}
