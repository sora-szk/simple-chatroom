import Joi from 'joi'

export class UserProfileRequestSchema {
    static create = Joi.object({
        nickname: Joi.string().allow(null).required(),
        bio: Joi.string().allow(null).required(),
        gender: Joi.string().valid('men', 'women', 'other').allow(null).required(),
        age: Joi.number().allow(null).required(),
        hobby: Joi.string().allow(null).required(),
    })

    static update = Joi.object({
        nickname: Joi.string().allow(null),
        bio: Joi.string().allow(null),
        gender: Joi.string().valid('men', 'women', 'other').allow(null),
        age: Joi.number().allow(null),
        hobby: Joi.string().allow(null),
    })
}
