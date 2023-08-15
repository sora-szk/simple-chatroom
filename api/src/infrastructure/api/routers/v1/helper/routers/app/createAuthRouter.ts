import Koa from 'koa'
import Router from 'koa-router'
import { AuthHandler } from '../../../../../../../app/adapters/handlers/v1/app/authHandler'

export const createAuthRouter = (
    handler: AuthHandler,
    middlewares: Koa.Middleware[] = []
): Router => {
    const router = new Router({ prefix: '/auth' })
    router.use(...middlewares)
    router.post('/signup', handler.signup)
    return router
}
