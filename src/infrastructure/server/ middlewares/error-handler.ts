import { Middleware } from 'koa'

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (error: any) {
    ctx.status = error.statusCode ?? 500
    ctx.body = {
      timeStamp: Date.now(),
      statusCode: ctx.status,
      ...(ctx.status === 500
        ? {
          message: 'Internal Server Error',
          details: 'No details available',
        }
        : {
          message: error.message,
          details: error.toString() ?? {},
        }),
    }
  }
}
