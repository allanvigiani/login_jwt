import { Router } from 'express'
import users from '@app/Users/controllers/UsersController'
import AuthMiddleware from '@app/Auth/middlewares/AuthMiddleware'

const routes = Router()

routes.get('/users', AuthMiddleware, users.users)

export default routes
