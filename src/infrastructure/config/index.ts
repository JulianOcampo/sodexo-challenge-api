import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

interface ConfigInfo {
  NODE_ENV: string
  SERVER_PORT: number
  GEOCODE_URL: string
  GEOCODE_KEY: string
  WEATHER_URL: string
  WEATHER_KEY: string
}

function loadConfig() {
  const configSchema = Joi.object<ConfigInfo>({
    NODE_ENV: Joi.string().required(),
    SERVER_PORT: Joi.number().required(),
    GEOCODE_URL: Joi.string().required(),
    GEOCODE_KEY: Joi.string().required(),
    WEATHER_URL: Joi.string().required(),
    WEATHER_KEY: Joi.string().required(),
  })

  const { error, value } = configSchema.validate(process.env, { allowUnknown: true })
  if (error) throw error
  return { ...value } as ConfigInfo
}

export { loadConfig }
