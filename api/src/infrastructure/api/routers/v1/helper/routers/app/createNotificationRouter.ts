import Koa from 'koa'
import Router from 'koa-router'
import { NotificationHandler } from '../../../../../../../app/adapters/handlers/v1/app/notificationHandler'

export const createNotificationRouter = (
    handler: NotificationHandler,
    middlewares: Koa.Middleware[] = []
): Router => {
    const router = new Router({ prefix: '/notification' })
    router.use(...middlewares)
    router.get('/', handler.getList)
    router.get('/:notification_id', handler.getDetail)
    return router
}
