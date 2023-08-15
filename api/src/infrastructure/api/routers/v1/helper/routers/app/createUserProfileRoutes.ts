import Koa from 'koa'
import Router from 'koa-router'
import { UserProfileHandler } from '../../../../../../../app/adapters/handlers/v1/app/userProfileHandler'

export const createUserProfileRouter = (
    handler: UserProfileHandler,
    middlewares: Koa.Middleware[] = []
): Router => {
    const router = new Router({ prefix: '/user_profile' })
    router.use(...middlewares)
    router.put('/', handler.update)
    router.get('/', handler.getDetail)
    return router
}
