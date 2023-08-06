import Joi from 'joi'

export const sendSchema = Joi.object({
    room_id: Joi.string().required(),
    text: Joi.string().required(),
    image: Joi.string().required(),
})

export const getListSchema = Joi.object({
    room_id: Joi.string().required(),
})

export const getDetailSchema = Joi.object({
    room_id: Joi.string().required(),
    room_message_id: Joi.string().required(),
})
