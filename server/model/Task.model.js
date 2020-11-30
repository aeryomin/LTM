import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true
  },
  executor: String,
  title: {
    type: String,
    required: true,
    default: 'New task'
  },
  content: String,
  status: {
    type: String,
    default: 'new'
  },
  groupID: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  deletedAt: Date,
  expiredAt: Date
})

export default mongoose.model('tasks', taskSchema)
