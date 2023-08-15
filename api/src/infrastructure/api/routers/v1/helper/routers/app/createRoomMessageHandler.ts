import Koa from 'koa'
import Router from 'koa-router'
import { RoomMessageHandler } from '../../../../../../../app/adapters/handlers/v1/app/roomMessageHandler'

export const createRoomMessageRouter = (
    handler: RoomMessageHandler,
    middlewares: Koa.Middleware[] = []
): Router => {
    const router = new Router({ prefix: '/room_message' })
    router.use(...middlewares)
    router.post('/', handler.send)
    router.get('/', handler.getList)
    router.get('/:room_message_id', handler.getDetail)
    return router
}
