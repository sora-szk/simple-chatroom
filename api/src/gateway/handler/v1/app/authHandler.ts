import Koa from 'koa'
import * as authRequestSchema from '../../../request/schema/authRequestSchema'
import { createAppError } from '../../../../domain/appError'
import { createAuthUsecase } from '../../../../usecase/authUsecase'

export const signupHandler = async (ctx: Koa.Context) => {
    const body = ctx.request.body as any
    const { error } = authRequestSchema.signupAuthRequestSchema.validate(body)
    if (error) {
        if (error.details.some((detail) => detail.type === 'any.required')) {
            const details = error.details.map((detail) => detail.message).join(', ')
            throw createAppError(400001, `Validation failed: ${details}`, `入力が必要です: ${details}`)
        } else {
            const details = error.details.map((detail) => detail.message).join(', ')
            throw createAppError(422001, `Validation failed: ${details}`, `入力が不正です: ${details}`)
        }
    }

    const authUsecase = createAuthUsecase()
    await authUsecase.signup(body.email, body.password)
    ctx.body = ''
    ctx.status = 201
}
