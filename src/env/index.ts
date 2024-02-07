import { error } from 'console'
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('⚠️ Invalid environment variables!``')

  throw error('Invalid environment variables!', _env.error.format())
}

export const env = _env.data
