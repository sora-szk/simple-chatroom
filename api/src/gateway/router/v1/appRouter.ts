import Router from 'koa-router'
import * as appHandler from '../../handler/v1/appHandler'
import * as chatRoomHandler from '../../handler/v1/app/chatRoomHandler'
import * as directMessageHandler from '../../handler/v1/app/directMessageHandler'
import * as notificationHandler from '../../handler/v1/app/notificationHandler'
import * as roomMessageHandler from '../../handler/v1/app/roomMessageHandler'
import * as userProfileHandler from '../../handler/v1/app/userProfileHandler'
import { authenticator } from '../../middleware/authenticator'

export const v1AppRouter = new Router({
    sensitive: true,
    prefix: '/app/v1',
})

// app
v1AppRouter.get('/ping', appHandler.pingGet)

// chatRoom
v1AppRouter.post('/chat_room', authenticator, chatRoomHandler.createHandler)
v1AppRouter.get('/chat_room', authenticator, chatRoomHandler.getListHandler)
v1AppRouter.get('/chat_room/:room_id', authenticator, chatRoomHandler.getDetailHandler)
v1AppRouter.put('/chat_room/:room_id/invite', authenticator, chatRoomHandler.inviteHandler)
v1AppRouter.put('/chat_room/:room_id/invite_editor', authenticator, chatRoomHandler.inviteEditorHandler)
v1AppRouter.put('/chat_room/:room_id/expal', authenticator, chatRoomHandler.expalHandler)

// directMessage
v1AppRouter.post('/direct_message', authenticator, directMessageHandler.sendHandler)
v1AppRouter.get('/direct_message', authenticator, directMessageHandler.getListHandler)
v1AppRouter.get('/direct_message/:direct_message_id', authenticator, directMessageHandler.getHandler)

// notificationHandler
v1AppRouter.get('/notification', authenticator, notificationHandler.getListHandler)
v1AppRouter.get('/notification/:notification_id', authenticator, notificationHandler.getDetailHandler)

// roomMessageHandler
v1AppRouter.post('/room_message', authenticator, roomMessageHandler.sendHandler)
v1AppRouter.get('/room_message', authenticator, roomMessageHandler.getListHandler)
v1AppRouter.get('/room_message/:room_message_id', authenticator, roomMessageHandler.getHandler)

// userProfile
v1AppRouter.put('/user_profile', authenticator, userProfileHandler.updateHandler)
v1AppRouter.get('/user_profile', authenticator, userProfileHandler.getHandler)
