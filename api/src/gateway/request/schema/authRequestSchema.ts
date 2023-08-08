import Joi from 'joi'

export const signupAuthRequestSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})
