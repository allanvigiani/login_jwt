import express, { Application } from 'express'
import cors from 'cors'
import routes from '@/routes'

export default class App {
  app: Application

  constructor() {
    this.app = express()

    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors())
  }

  private routes() {
    this.app.use(routes)
  }

  private exceptionHandler() {}
}