import Joi from 'joi';

export const createChatRoomSchema = Joi.object({
    name: Joi.string().required(),
    editor_list: Joi.array().items(Joi.string()).required(),
    white_list: Joi.array().items(Joi.string()).allow(null),
    black_list: Joi.array().items(Joi.string()).required(),
});

export const inviteSchema = Joi.object({
    room_id: Joi.string().required(),
    invite_user_id: Joi.string().required(),
});

export const expalSchema = Joi.object({
    room_id: Joi.string().required(),
    expal_user_id: Joi.string().required(),
});

export const getListSchema = Joi.object({
    room_id: Joi.string().required(),
});

export const getDetailSchema = Joi.object({
    room_id: Joi.string().required(),
});