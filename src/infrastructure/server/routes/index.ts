import Router from 'koa-router'
import { healthRouteController } from './controllers/health-controller'
import { weatherController } from './controllers/weather-controller'

export function loadRoutes(router: Router) {
  router.get('/health', healthRouteController)

  router.get('/weather-by-country-code', weatherController)

  return router
}
