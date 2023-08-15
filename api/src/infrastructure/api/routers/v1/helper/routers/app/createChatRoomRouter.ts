import Koa from 'koa'
import Router from 'koa-router'
import { ChatRoomHandler } from '../../../../../../../app/adapters/handlers/v1/app/chatRoomHandler'

export const createChatRoomRouter = (
    handler: ChatRoomHandler,
    middlewares: Koa.Middleware[] = []
): Router => {
    const router = new Router({ prefix: '/chat_room' })
    router.use(...middlewares)
    router.post('/', handler.create)
    router.get('/', handler.getList)
    router.get('/:room_id', handler.getDetail)
    router.put('/:room_id/invite', handler.invite)
    router.put('/:room_id/invite_editor', handler.inviteEditor)
    router.put('/:room_id/expel', handler.expel)
    return router
}
