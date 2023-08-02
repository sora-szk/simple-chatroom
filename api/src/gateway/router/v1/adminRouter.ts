import Router from "koa-router";

import * as adminNotificationHandler from '../../handler/v1/admin/adminNotificationHandler'
import * as adminUserProfileHandler from '../../handler/v1/admin/adminUserProfileHandler'

export const v1AdminRouter = new Router({
    sensitive: true,
    prefix: '/admin/v1'
})

// notification
v1AdminRouter.post('/notification', adminNotificationHandler.pushHandler)

// userProfile
v1AdminRouter.post('/user_profile/:uid', adminUserProfileHandler.createHandler)