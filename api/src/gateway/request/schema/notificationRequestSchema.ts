import Joi from 'joi'

export const getDetailSchema = Joi.object({
    notificatin_id: Joi.string().required(),
})

export const pushSchema = Joi.object({
    receive_user_id: Joi.string().required(),
    title: Joi.string().required(),
    message: Joi.string().required(),
})
