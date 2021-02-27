import express from 'express'
import * as groupController from '../../controller/group.controller'

const router = express.Router()

router.get('/', groupController.getAll)
router.post('/', groupController.create)
router.patch('/:id', groupController.updateField)
router.delete('/:id', groupController.deleteGroup)

export default router
