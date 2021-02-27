import express from 'express'
import * as authController from '../../controller/auth.controller'
// import authValidation from '../../middleware/authValidation'

const router = express.Router()

router.get('/', authController.tryLogin)
router.get('/:id', authController.getUser)
router.patch('/:id', authController.updateUser)
router.post('/', authController.login)
router.post('/registration', authController.registration)

export default router
