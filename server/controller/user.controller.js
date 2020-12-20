/* eslint-disable no-console */
import User from '../model/User.model'

export async function getOne(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.json({ status: 'ok', user })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function getAll(req, res) {
  try {
    const users = await User.find({ isDeleted: false })
    res.json({ status: 'ok', users })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function addDeviceToken(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id })
    user.deviceToken = req.body.currentToken
    user.save()
    res.json({ status: 'ok', user })
  } catch (err) {
    res.json({ status: 'updata error', err })
  }
}
