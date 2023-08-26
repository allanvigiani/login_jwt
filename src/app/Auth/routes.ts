import { Router } from 'express'
import auth from '@app/Auth/controllers/AuthController'
import authMiddleware from '@app/Auth/middlewares/AuthMiddleware'

const routes = Router()

routes.post('/auth/login', auth.create)
routes.delete('/auth/logout', authMiddleware, auth.destroy)

export default routes
