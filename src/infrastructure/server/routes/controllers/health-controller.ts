import { Middleware } from 'koa'

export const healthRouteController: Middleware = ctx => (ctx.body = 'check')
