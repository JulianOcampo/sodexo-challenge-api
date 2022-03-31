import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

interface ConfigInfo {
  NODE_ENV: string
  SERVER_PORT: number
  GEOCODE_URL: string
  GEOCODE_KEY: string
  WHEATHER_URL: string
  WHEATHER_KEY: string
}

function loadConfig() {
  const configSchema = Joi.object<ConfigInfo>({
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    SERVER_PORT: Joi.number().required(),
    GEOCODE_URL: Joi.string().required(),
  })

  const { error, value } = configSchema.validate(process.env, { allowUnknown: true })
  console.log('- Environment variables loaded...')

  if (error) throw error
  return { ...value } as ConfigInfo
}

export { loadConfig }
