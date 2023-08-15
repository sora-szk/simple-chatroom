import Joi from 'joi'

export class AuthRequestSchema {
    public static signupAuthRequest = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
}
