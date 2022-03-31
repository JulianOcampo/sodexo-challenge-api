import {Server} from 'http'
import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import Router from 'koa-router'
import logger from 'koa-logger'
import cors from '@koa/cors'
import {errorHandler} from './ middlewares/error-handler'
import {loadRoutes} from './routes'

interface WebServerOptions {
  port: number
}

export function loadWebServer(options: WebServerOptions) {
  const app = new Koa()

  const router = new Router()
  loadRoutes(router)

  app
    .use(errorHandler)
    .use(cors())
    .use(bodyparser())
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods())

  let runningServer: Server | undefined = undefined
  return {
    start: () => {
      runningServer = app.listen(process.env.PORT || options.port, () =>
        console.log(`- Web server started on PORT: ${process.env.PORT || options.port}`),
      )
    },
    close: () => {
      runningServer?.close()
      console.log('- Closed web server')
    },
  }
}
