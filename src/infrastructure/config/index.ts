import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

interface ConfigInfo {
  NODE_ENV: string
  PORT: number
  DB_URI: string
}

function loadConfig() {
  const configSchema = Joi.object<ConfigInfo>({
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    PORT: Joi.number().required(),
    DB_URI: Joi.string().uri().required(),
  })

  const {error, value} = configSchema.validate(process.env, {allowUnknown: true})
  console.log('- Environment variables loaded...')

  if (error) throw error
  return {...value} as ConfigInfo
}

export {loadConfig}
