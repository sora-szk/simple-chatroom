import Koa from 'koa'
import Router from 'koa-router'
import { CommonHandler } from '../../../../../../app/adapters/handlers/commonHandler'

export const createCommonRouter = (
    handler: CommonHandler,
    middlewares: Koa.Middleware[] = []
): Router => {
    const router = new Router()
    router.use(...middlewares)
    router.get('/ping', handler.ping)
    return router
}
