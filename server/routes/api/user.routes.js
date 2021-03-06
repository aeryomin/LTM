import express from 'express'
import * as userController from '../../controller/user.controller'

const router = express.Router()

router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.post('/notification/:id', userController.requestNotification)
// router.post('/', userController.create)
// router.put('/', userController.updateField)
router.patch('/:id', userController.addDeviceToken)
// router.delete('/:id', userController.del)

export default router
