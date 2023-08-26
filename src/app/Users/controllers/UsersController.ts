import { Request, Response } from 'express'
const db = require('../../../../connection/conn_db')

class UsersController {
  
  async users(_req: Request, res: Response): Promise<Response> {
    await db.connect()
    const result = await db.query(`SELECT * FROM users`)
    const users = result.rows

    return res.status(200).json(users)
  }
}

export default new UsersController()
