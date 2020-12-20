/* eslint-disable no-console */
import Task from '../model/Task.model'

export async function getAll(req, res) {
  try {
    const tasks = await Task.find({ isDeleted: false })
    res.json({ status: 'ok', tasks })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

// export async function requestNotification(req, res) {
//   try {
//     const task = await Task.findOne({ _id: req.params.id })
//     res.json({ status: 'ok', task })
//   } catch (err) {
//     console.log(err)
//     res.json({ status: 'error', err })
//   }
// }

export async function updateField(req, res) {
  try {
    const task = await Task.updateOne(
      { _id: req.body.id },
      { $set: { [req.body.field]: req.body.fieldContent } },
      { upsert: false }
    )
    res.json({ status: 'ok', task })
  } catch (err) {
    res.json({ status: 'updata error', err })
  }
}

export async function updateData(req, res) {
  try {
    const task = await Task.updateOne(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          expiredAt: req.body.expiredAt,
          creator: req.body.creator,
          executor: req.body.executor
        }
      },
      { upsert: false }
    )
    res.json({ status: 'ok', task })
  } catch (err) {
    res.json({ status: 'updata error', err })
  }
}

export function create(req, res) {
  try {
    const newTask = new Task(req.body)
    newTask.save()
    res.json({ status: 'ok', newTask })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

// export function del(req, res) {
//   return res.json({ status: 'ok' })
// }
