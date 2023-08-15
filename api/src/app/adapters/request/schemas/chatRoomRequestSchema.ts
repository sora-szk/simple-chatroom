import Joi from 'joi'

export class ChatRoomRequestSchema {
    static create = Joi.object({
        name: Joi.string().required(),
        editor_list: Joi.array().items(Joi.string()).required(),
        white_list: Joi.array().items(Joi.string()).allow(null),
        black_list: Joi.array().items(Joi.string()).required(),
    })

    static invite = Joi.object({
        room_id: Joi.string().required(),
        invite_user_id: Joi.string().required(),
    })

    static expel = Joi.object({
        room_id: Joi.string().required(),
        expel_user_id: Joi.string().required(),
    })

    static getList = Joi.object({
        room_id: Joi.string().required(),
    })

    static getDetail = Joi.object({
        room_id: Joi.string().required(),
    })
}
