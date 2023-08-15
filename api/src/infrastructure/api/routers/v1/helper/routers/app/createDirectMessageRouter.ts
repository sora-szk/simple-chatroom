import Koa from 'koa'
import Router from 'koa-router'
import { DirectMessageHandler } from '../../../../../../../app/adapters/handlers/v1/app/directMessageHandler'

export const createDirectMessageRouter = (
    handler: DirectMessageHandler,
    middlewares: Koa.Middleware[] = []
): Router => {
    const router = new Router({ prefix: '/direct_message' })
    router.use(...middlewares)
    router.post('/', handler.send)
    router.get('/', handler.getList)
    router.get('/:direct_message_id', handler.getDetail)
    return router
}
