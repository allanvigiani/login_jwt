import { NextFunction, Request, Response } from 'express'
import AuthService from '@app/Auth/services/AuthServices'
import AuthError from '@app/Auth/exceptions/AuthError'

export default async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).json({ error: 'Token não fornecido.' })
  }

  const [, token] = authorization?.split(' ')

  try {
    const authService = new AuthService()
    const id = await authService.validateToken(token)

    req.user = { id, token }

  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({ message: 'Token inválido' })
    }

    return res.status(500).json({ error })
  }

  return next()
}
