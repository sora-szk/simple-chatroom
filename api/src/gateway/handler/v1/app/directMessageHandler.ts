import Koa from 'koa'
import { DirectMessageUsecase, createDirectMessageUsecase } from '../../../../usecase/directMessageUsecase'
import { createAppError } from '../../../../domain/appError'
import * as directMessageRequestSchema from '../../../request/schema/directMessageRequestSchema'
import * as directMessagePresenter from '../../../presenter/directMessagePresenter'

export const sendHandler = async (ctx: Koa.Context) => {
    const body = ctx.request.body as any
    const { error } = directMessageRequestSchema.sendSchema.validate(body)
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
        sender: ctx.state.uid,
        receiver: body.receiver,
        text: body.text,
        image: body.image,
    }
    const directMessageUsecase: DirectMessageUsecase = createDirectMessageUsecase()
    await directMessageUsecase.send(mappedData)
    ctx.body = ''
    ctx.status = 201
}

export const getListHandler = async (ctx: Koa.Context) => {
    const query = ctx.query as any
    const { error } = directMessageRequestSchema.getListSchema.validate(query)
    if (error) {
        if (error.details.some((detail) => detail.type === 'any.required')) {
            const details = error.details.map((detail) => detail.message).join(', ')
            throw createAppError(400001, `Validation failed: ${details}`, `入力が必要です: ${details}`)
        } else {
            const details = error.details.map((detail) => detail.message).join(', ')
            throw createAppError(422001, `Validation failed: ${details}`, `入力が不正です: ${details}`)
        }
    }

    const directMessageUsecase: DirectMessageUsecase = createDirectMessageUsecase()
    const messages = await directMessageUsecase.getList(ctx.state.uid, query.partner_uid, query.from_message_id, query.to_message_id)
    ctx.body = {
        direct_messages: directMessagePresenter.detailList(messages),
    }
    ctx.status = 200
}

export const getHandler = async (ctx: Koa.Context) => {
    const { direct_message_id } = ctx.params
    const { error } = directMessageRequestSchema.getDetailSchema.validate(ctx.params)
    if (error) {
        if (error.details.some((detail) => detail.type === 'any.required')) {
            const details = error.details.map((detail) => detail.message).join(', ')
            throw createAppError(400001, `Validation failed: ${details}`, `入力が必要です: ${details}`)
        } else {
            const details = error.details.map((detail) => detail.message).join(', ')
            throw createAppError(422001, `Validation failed: ${details}`, `入力が不正です: ${details}`)
        }
    }

    const directMessageUsecase: DirectMessageUsecase = createDirectMessageUsecase()
    const message = await directMessageUsecase.get(direct_message_id)
    ctx.body = {
        direct_message: message ? directMessagePresenter.detail(message) : null,
    }
    ctx.status = 200
}
