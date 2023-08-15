import Router from 'koa-router'
import { commonHandlerFactory } from '../../../factories/handlers/v1/commonHandlerFactory'
import { createAdminNotificationHandler } from './helper/handlers/createAdminNotificationHandler'
import { createCommonRouter } from './helper/routers/createCommonRouter'
import { createAdminNotificationRouter } from './helper/routers/admin/createAdminNotificationRouter'

/// DI for handlers
const commonHandler = commonHandlerFactory()
const adminNotificationHandler = createAdminNotificationHandler()

/**
 * AdminAPI v1のエンドポイントを管理する。
 */
export const v1AdminRouter = new Router({
    sensitive: true,
    prefix: '/admin/v1',
})

v1AdminRouter.use(createCommonRouter(commonHandler).routes())
v1AdminRouter.use(createAdminNotificationRouter(adminNotificationHandler).routes())
