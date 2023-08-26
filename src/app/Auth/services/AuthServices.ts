import AuthError from '@app/Auth/exceptions/AuthError'
import jwt from 'jsonwebtoken'
import config from '@/config'
import { getValue, setValue } from '@/lib/redis'
const db = require('../../../../connection/conn_db')

export default class AuthService {

  async login(
    email: string,
    password: string,
  ): Promise<{ user: object; token: string }> {
    
    try {
      await db.connect()
      const query = await db.query(`SELECT * FROM users u WHERE u.email = $1 AND u.password = $2`, [email, password])
      const user = query.rows[0]

      if (!user) {
        throw new AuthError(`Usuário ou senha incorretos!`)
      }

      const { id, name } = user

      const token = jwt.sign({ id }, config.auth.secret, {
        expiresIn: config.auth.expires,
      })

      return {
        user: { id, name, email },
        token,
      }
    } catch (error) {
      throw new AuthError(`${error}`)
    }
    
  }

  async logout(token: string) {
    await this.blacklistToken(token)
  }

  async validateToken(token: string): Promise <string> {
    try {

      if (await this.isTokenBlacklisted(token)) {
        throw new AuthError('Token expirado/bloqueado.')
      }

      const decoded = jwt.verify(token, config.auth.secret) as { id: string }

      return decoded.id
    } catch (error) {
      throw new AuthError(`${error}`)
    }
  }

  private async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await getValue(`tokens:invalidated:${token}`)

    return !!blacklistedToken
  }

  private async blacklistToken(token: string): Promise<void> {
    await setValue(`tokens:invalidated:${token}`, true)
  }

}
