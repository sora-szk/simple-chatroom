import Koa from 'koa'
import { UserProfileUsecase, createUserProfileUsecase } from '../../../../usecase/userProfileUsecase'
import * as userProfileRequestSchema from '../../../request/schema/userProfileRequestSchema'
import * as userProfilePresenter from '../../../presenter/userProfilePresenter'
import { createAppError } from '../../../../domain/appError'

export const updateHandler: Koa.Middleware = async (ctx: Koa.Context) => {
    const body = ctx.request.body as any

    const { error } = userProfileRequestSchema.updateSchema.validate(body)
    if (error) {
        if (error.details.some((detail) => detail.type === 'any.required')) {
            const details = error.details.map((detail) => detail.message).join(', ')
            throw createAppError(400001, `Validation failed: ${details}`, `入力が必要です: ${details}`)
        } else {
            const details = error.details.map((detail) => detail.message).join(', ')
            throw createAppError(422001, `Validation failed: ${details}`, `入力が不正です: ${details}`)
        }
    }

    const userProfileUsecase: UserProfileUsecase = createUserProfileUsecase()
    await userProfileUsecase.update(ctx.state.uid, body)
    ctx.body = ''
    ctx.status = 204
}

export const getHandler: Koa.Middleware = async (ctx: Koa.Context) => {
    const uid = ctx.state.uid

    const userProfileUsecase: UserProfileUsecase = createUserProfileUsecase()
    const result = await userProfileUsecase.get(uid)
    ctx.body = {
        user_profile: result ? userProfilePresenter.detail(result) : null,
    }
    ctx.state = 200
}
