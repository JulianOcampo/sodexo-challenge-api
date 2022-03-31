import Router from 'koa-router'
import {pingRouteController} from './controllers/ping'

export function loadRoutes(router: Router) {
  router.get('/ping', pingRouteController)

  return router
}
