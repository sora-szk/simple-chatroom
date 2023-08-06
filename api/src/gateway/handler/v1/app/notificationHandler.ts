import Koa from 'koa'
import { createAppError } from '../../../../domain/appError'
import { NotificationUsecase, createNotificationUsecase } from '../../../../usecase/notificationUsecase'
import * as notificationRequestSchema from '../../../request/schema/notificationRequestSchema'
import * as notificationPresenter from '../../../presenter/notificationPresenter'

export const getListHandler = async (ctx: Koa.Context) => {
    const receiverID = ctx.state.uid

    const notificationUsecase: NotificationUsecase = createNotificationUsecase()
    const notifications = await notificationUsecase.getList(receiverID)
    ctx.body = {
        notifications: notificationPresenter.detailList(notifications),
    }
    ctx.status = 200
}

export const getDetailHandler = async (ctx: Koa.Context) => {
    const receiverID = ctx.state.uid
    const { notification_id } = ctx.params
    const { error } = notificationRequestSchema.getDetailSchema.validate({ notification_id })
    if (error) {
        if (error.details.some((detail) => detail.type === 'any.required')) {
            const details = error.details.map((detail) => detail.message).join(', ')
            throw createAppError(400001, `Validation failed: ${details}`, `入力が必要です: ${details}`)
        } else {
            const details = error.details.map((detail) => detail.message).join(', ')
            throw createAppError(422001, `Validation failed: ${details}`, `入力が不正です: ${details}`)
        }
    }

    const notificationUsecase: NotificationUsecase = createNotificationUsecase()
    const notificationDetail = await notificationUsecase.getDetail(notification_id)

    // リクエストユーザがメッセージ宛先ユーザであるか
    // FIXME: usecaseに移行すべき処理
    const forRequestUserNotification = receiverID === notificationDetail?.receiver

    ctx.body = {
        notification: notificationDetail && forRequestUserNotification ? notificationPresenter.detail(notificationDetail) : null,
    }
    ctx.status = 200
}
