import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'New Group'
  },
  usersID: [String],
  creatorID: {
    type: String,
    require: true
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
  }
})

export default mongoose.model('groups', groupSchema)
