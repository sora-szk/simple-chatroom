import Koa from 'koa'
import config from 'config'

import { APP_ERROR_CODES } from '../../errors/constants/appErrorCodes'
import { appErrorFactory } from '../../errors/factories/appErrorFactory'
import { AppContext } from '../api/types/appContext'
import { HeaderParamRequestSchema } from '../../app/adapters/request/schemas/headerParamSchema'

/**
 * x-api-keyヘッダにセットされているAPIキーのバリデーションを行うミドルウェアです。
 * - APIキーを検証します
 * - リクエストされたrouterに対応するAPIキーのみ有効です
 */
export const apiKeyValidator: Koa.Middleware = async (ctx: AppContext, next: Koa.Next) => {
    const validationResult = HeaderParamRequestSchema.apiKey.validate(
        ctx.request.headers['x-api-key']
    )
    if (validationResult.error) throw appErrorFactory(APP_ERROR_CODES.AUTH_FORBIDDEN)

    const useRouter = ctx.path.split('/')?.[1]
    const configuredAPIkey = _getConfiguredAPIKey(useRouter)

    if (!configuredAPIkey || configuredAPIkey !== validationResult.value) {
        throw appErrorFactory(APP_ERROR_CODES.AUTH_FORBIDDEN)
    }
    return next()
}

const _getConfiguredAPIKey = (router: string | undefined): string | null => {
    try {
        switch (router) {
            case 'app':
                return config.get<string>('apiKey.app')
            case 'admin':
                return config.get<string>('apiKey.admin')
            default:
                return null
        }
    } catch (error: any) {
        throw appErrorFactory(APP_ERROR_CODES.INTERNAL_SERVER_ERROR, {
            details: `Error fetching configuration: ${error.message}`,
        })
    }
}
