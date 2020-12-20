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

export async function requestNotification(req, res) {
  console.log('-->> req.params.id', req.params.id)
  try {
    const user = await User.findOne({ _id: req.params.id })
    console.log(user.deviceToken)
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAA2srSUFs:APA91bH7LZlvxOGpBSMjlzVRhyCYa_ObcHKIOFAUR6IDWhJkSMZ91fcmbtsz8WwvyevXOYd2lN0xH4Eo85Bm7X9TRMxNo7GUy8MOVuqcHb2e1sGGInfBZeMVvf-XNl77OyQWtuJjUewq'
      },
      body: JSON.stringify({
        to: user.deviceToken,
        data: {
          title: 'New Task',
          body: 'Task name'
        }
      })
    })
    res.json({ status: 'ok', user })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}
