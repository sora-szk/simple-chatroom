import Joi from 'joi';

export const sendSchema = Joi.object({
    receiver: Joi.string().required(),
    text: Joi.string().allow(null).optional(),
    image: Joi.string().uri().allow(null).optional(),
});

export const getListSchema = Joi.object({
    partner_uid: Joi.string().required(),
    from_message_id: Joi.number().optional(),
    to_message_id: Joi.number().optional(),
});

export const getDetailSchema = Joi.object({
    direct_message_id: Joi.string().required(),
});
