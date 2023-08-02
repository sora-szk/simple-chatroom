import Joi from 'joi';

export const createSchema = Joi.object({
    nickname: Joi.string().allow(null).required(),
    bio: Joi.string().allow(null).required(),
    gender: Joi.string().valid('men', 'women', 'other').allow(null).required(),
    age: Joi.number().allow(null).required(),
    hobby: Joi.string().allow(null).required()
});

export const updateSchema = Joi.object({
    nickname: Joi.string().allow(null),
    bio: Joi.string().allow(null),
    gender: Joi.string().valid('men', 'women', 'other').allow(null),
    age: Joi.number().allow(null),
    hobby: Joi.string().allow(null)
});
