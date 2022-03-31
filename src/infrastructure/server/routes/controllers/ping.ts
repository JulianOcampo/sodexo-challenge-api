import {Middleware} from 'koa'

export const pingRouteController: Middleware = ctx => (ctx.body = 'pong')
