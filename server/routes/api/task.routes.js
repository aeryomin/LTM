import express from 'express'
import * as taskController from '../../controller/task.controller'

const router = express.Router()

router.get('/', taskController.getAll)
// router.get('/:id', taskController.requestNotification)
router.post('/', taskController.create)
router.put('/', taskController.updateField)
router.patch('/', taskController.updateData)
// router.delete('/:id', taskController.del)

export default router
