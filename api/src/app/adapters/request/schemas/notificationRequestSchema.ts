import Joi from 'joi'

export class NotificationRequestSchema {
    static getDetail = Joi.object({
        notificatin_id: Joi.string().required(),
    })

    static push = Joi.object({
        receive_user_id: Joi.string().required(),
        title: Joi.string().required(),
        message: Joi.string().required(),
    })
}
