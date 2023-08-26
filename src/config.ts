import dotenv from 'dotenv'

dotenv.config()

export default {
  port: Number(process.env.PORT) || 3000,
  auth: {
    secret: process.env.AUTH_SECRET || 'SECRET_KEY',
    expires: process.env.AUTH_EXPIRES_IN || '7d',
  },
  redis: {
    url: process.env.REDIS_URL,
  },
}
