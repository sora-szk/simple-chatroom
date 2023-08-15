import Joi from 'joi'
import { APP_ERROR_CODES } from '../../../../errors/constants/appErrorCodes'
import { appErrorFactory } from '../../../../errors/factories/appErrorFactory'

export const validationErrorHandler = (error?: Joi.ValidationError) => {
    if (error) {
        const details = error.details.map((detail) => detail.message).join(', ')
        if (error.details.some((detail) => detail.type === 'any.required')) {
            throw appErrorFactory(APP_ERROR_CODES.BAD_REQUEST, {
                details: `Validation failed: ${details}`,
                userMessage: `入力が必要です: ${details}`,
            })
        }
        throw appErrorFactory(APP_ERROR_CODES.INVALID_INPUT, {
            details: `Validation failed: ${details}`,
            userMessage: `入力が不正です: ${details}`,
        })
    }
}
