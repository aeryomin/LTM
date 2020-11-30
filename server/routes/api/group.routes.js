import express from 'express'
import * as groupController from '../../controller/group.controller'

const router = express.Router()

router.get('/', groupController.getAll)
// router.get('/:id', groupController.getOne)
router.post('/', groupController.create)
// router.put('/', groupController.updateData)
router.patch('/:id', groupController.updateField)
router.delete('/:id', groupController.deleteGroup)

export default router
