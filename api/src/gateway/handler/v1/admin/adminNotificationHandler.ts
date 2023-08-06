import Koa from 'koa'
import { createAppError } from '../../../../domain/appError'
import { NotificationUsecase, createNotificationUsecase } from '../../../../usecase/notificationUsecase'
import * as notificationRequestSchema from '../../../request/schema/notificationRequestSchema'

export const pushHandler = async (ctx: Koa.Context) => {
    const body = ctx.request.body as any
    const { error } = notificationRequestSchema.pushSchema.validate(body)
    if (error) {
        if (error.details.some((detail) => detail.type === 'any.required')) {
            const details = error.details.map((detail) => detail.message).join(', ')
            throw createAppError(400001, `Validation failed: ${details}`, `入力が必要です: ${details}`)
        } else {
            const details = error.details.map((detail) => detail.message).join(', ')
            throw createAppError(422001, `Validation failed: ${details}`, `入力が不正です: ${details}`)
        }
    }

    const mappedData = {
        receiver: body.receive_user_id,
        title: body.title,
        message: body.message,
    }

    const notificationUsecase: NotificationUsecase = createNotificationUsecase()
    await notificationUsecase.push(mappedData)
    ctx.body = ''
    ctx.status = 204
}
