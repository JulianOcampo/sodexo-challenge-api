import {loadConfig} from './infrastructure/config'
import {loadWebServer} from './infrastructure/server/server'

async function main() {
  const appConfig = loadConfig()
  const webServerModule = loadWebServer({port: appConfig.SERVER_PORT})

  webServerModule.start()

  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM']
  signals.forEach(s =>
    process.once(s, async () => {
      console.log('...Closing App...')
      webServerModule.close()
      console.log('...App Closed...')
    }),
  )

  const errorTypes = ['unhandledRejection', 'uncaughtException']
  errorTypes.map(type => {
    process.on(type, async e => {
      try {
        console.log(`process.on ${type}`)
        console.error(e)
        webServerModule.close()
        process.exit(0)
      } catch (_) {
        process.exit(1)
      }
    })
  })
}

main()
