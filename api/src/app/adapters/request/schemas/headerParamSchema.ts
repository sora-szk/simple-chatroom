import Joi from 'joi'

export class HeaderParamRequestSchema {
    static apiKey = Joi.string()
        .pattern(/^[a-zA-Z0-9\-_]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Invalid API key format.',
        })

    static authToken = Joi.string()
        .pattern(/^Bearer [a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Invalid Bearer token format.',
        })
}
