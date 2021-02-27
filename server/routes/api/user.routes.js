import express from 'express'
import * as userController from '../../controller/user.controller'

const router = express.Router()

router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.post('/notification/:id', userController.requestNotification)
router.patch('/:id', userController.addDeviceToken)

export default router
