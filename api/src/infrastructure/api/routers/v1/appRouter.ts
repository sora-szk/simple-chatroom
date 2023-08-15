import Router from 'koa-router'
import { authenticator } from '../../../middlewares/authenticator'
import { commonHandlerFactory } from '../../../factories/handlers/v1/commonHandlerFactory'
import { createAuthHandler } from './helper/handlers/createAuthHandler'
import { createChatRoomHandler } from './helper/handlers/createChatRoomHandler'
import { createDirectMessageHandler } from './helper/handlers/createDirectMessageHandler'
import { createNotificationHandler } from './helper/handlers/createNotificationHandler'
import { createRoomMessageHandler } from './helper/handlers/createRoomMessageHandler'
import { createUserProfileHandler } from './helper/handlers/createUserProfileHandler'
import { createAuthRouter } from './helper/routers/app/createAuthRouter'
import { createChatRoomRouter } from './helper/routers/app/createChatRoomRouter'
import { createDirectMessageRouter } from './helper/routers/app/createDirectMessageRouter'
import { createNotificationRouter } from './helper/routers/app/createNotificationRouter'
import { createRoomMessageRouter } from './helper/routers/app/createRoomMessageHandler'
import { createUserProfileRouter } from './helper/routers/app/createUserProfileRoutes'
import { createCommonRouter } from './helper/routers/createCommonRouter'

/// DI for handlers
const commonHandler = commonHandlerFactory()
const authHandler = createAuthHandler()
const chatRoomHandler = createChatRoomHandler()
const directMessageHandler = createDirectMessageHandler()
const notificationHandler = createNotificationHandler()
const roomMessageHandler = createRoomMessageHandler()
const userProfileHandler = createUserProfileHandler()

/**
 * AppAPI v1のエンドポイントを管理する。
 */
export const v1AppRouter = new Router({
    sensitive: true,
    prefix: '/app/v1',
})

v1AppRouter.use(createCommonRouter(commonHandler).routes())
v1AppRouter.use(createAuthRouter(authHandler).routes())
v1AppRouter.use(createChatRoomRouter(chatRoomHandler, [authenticator]).routes())
v1AppRouter.use(createDirectMessageRouter(directMessageHandler, [authenticator]).routes())
v1AppRouter.use(createNotificationRouter(notificationHandler, [authenticator]).routes())
v1AppRouter.use(createRoomMessageRouter(roomMessageHandler, [authenticator]).routes())
v1AppRouter.use(createUserProfileRouter(userProfileHandler, [authenticator]).routes())
