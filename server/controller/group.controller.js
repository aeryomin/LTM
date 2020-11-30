/* eslint-disable no-console */
import Group from '../model/Group.model'

export function create(req, res) {
  try {
    const newGroup = new Group(req.body)
    newGroup.save()
    res.json({ status: 'ok', newGroup })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function getAll(req, res) {
  try {
    const groups = await Group.find({ isDeleted: false })
    res.json({ status: 'ok', groups })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function deleteGroup(req, res) {
  try {
    await Group.deleteOne({ _id: req.params.id })
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function updateField(req, res) {
  try {
    switch (req.body.action) {
      case 'add user': {
        const group = await Group.updateOne(
          { _id: req.params.id },
          { $push: { usersID: req.body.id } }
        )
        res.json({ status: 'ok', group })
        break
      }
      case 'remove user': {
        const group = await Group.updateOne(
          { _id: req.params.id },
          { $pull: { usersID: req.body.id } }
        )
        res.json({ status: 'ok', group })
        break
      }
      // case 'remove group': {
      //   const group = await Group.updateOne({ _id: req.params.id }, { $set: { isDeleted: true } })
      //   res.json({ status: 'ok', group })
      //   break
      // }
      default:
        break
    }
  } catch (err) {
    res.json({ status: 'updata error', err })
  }
}
