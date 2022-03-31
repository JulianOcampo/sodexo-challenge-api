import Router from 'koa-router'
import { healthRouteController } from './controllers/health'
import { wheatherController } from './controllers/wheather-controller'

export function loadRoutes(router: Router) {
  router.get('/health', healthRouteController)

  router.get('/wheather-by-country-code',wheatherController)

  return router
}
