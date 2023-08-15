import Koa from 'koa'
import Router from 'koa-router'
import { AdminNotificationHandler } from '../../../../../../../app/adapters/handlers/v1/admin/adminNotificationHandler'

export const createAdminNotificationRouter = (
    adminNotificationHandler: AdminNotificationHandler,
    middlewares: Koa.Middleware[] = []
): Router => {
    const router = new Router({ prefix: '/notification' })
    router.use(...middlewares)
    router.post('/', adminNotificationHandler.pushHandler)
    return router
}
