import Koa from 'koa'
import config from 'config'
import { createAppError } from '../../domain/appError'

export const apiKeyValidator: Koa.Middleware = async (ctx: Koa.Context, next: Koa.Next) => {
    const apiKey = ctx.request.headers['x-api-key']
    if (!apiKey) throw createAppError(403001)

    let validateApiKey = ''
    const useRouter = ctx.path.split('/')?.[1]
    switch (useRouter) {
        case 'app':
            validateApiKey = config.get<string>('apiKey.app')
            break
        case 'admin':
            validateApiKey = config.get<string>('apiKey.admin')
            break
    }

    if (validateApiKey !== apiKey) {
        throw createAppError(403001)
    }

    return next()
}
