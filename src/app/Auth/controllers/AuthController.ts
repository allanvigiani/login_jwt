import { Request, Response } from 'express'
import AuthService from '@app/Auth/services/AuthServices'
import AuthError from '@app/Auth/exceptions/AuthError'
const db = require('../../../../connection/conn_db')

class AuthController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    try {
      const authService = new AuthService()
      
      const login = await authService.login(email, password)

      return res.status(200).json({ login })
    } catch (error) {

      if (error instanceof AuthError) {
        return res.status(401).json({ message: `Usuário ou senha incorretos!` })
      }

      return res.status(500).json({ error })
    }
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    req.user.id && (await new AuthService().logout(req.user.token))

    return res.status(200).send()
  }
}

export default new AuthController()
