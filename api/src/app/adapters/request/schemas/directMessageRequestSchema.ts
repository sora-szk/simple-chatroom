import Joi from 'joi'

export class DirectMessageRequestSchema {
    static send = Joi.object({
        receiver: Joi.string().required(),
        text: Joi.string().allow(null).optional(),
        image: Joi.string().uri().allow(null).optional(),
    })

    static getList = Joi.object({
        partner_uid: Joi.string().required(),
        from_message_id: Joi.number().optional(),
        to_message_id: Joi.number().optional(),
    })

    static getDetail = Joi.object({
        direct_message_id: Joi.string().required(),
    })
}
