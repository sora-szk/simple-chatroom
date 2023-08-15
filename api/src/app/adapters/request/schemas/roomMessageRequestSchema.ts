import Joi from 'joi'

export class RoomMessageRequestSchema {
    static send = Joi.object({
        room_id: Joi.string().required(),
        text: Joi.string().required(),
        image: Joi.string().required(),
    })

    static getList = Joi.object({
        room_id: Joi.string().required(),
    })

    static getDetail = Joi.object({
        room_message_id: Joi.string().required(),
    })
}
