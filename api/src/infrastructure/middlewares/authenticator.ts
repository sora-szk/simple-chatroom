import Koa from 'koa'
import admin from 'firebase-admin'
import { AppContext } from '../api/types/appContext'
import { HeaderParamRequestSchema } from '../../app/adapters/request/schemas/headerParamSchema'
import { APP_ERROR_CODES } from '../../errors/constants/appErrorCodes'
import { appErrorFactory } from '../../errors/factories/appErrorFactory'
import { logger } from '../api/logger'

/**
 * Authorizationヘッダに含まれるBearerトークンの検証を行うミドルウェアです。
 * - Authorizationヘッダーの形式を検証します
 * - Bearerトークンのフォーマットを検証します
 * - Firebase Admin SDKを使用してトークンの整合性を確認します
 * - 該当アカウントのメールアドレスが認証されているか確認します
 * - トークンが有効かつ、メールアドレスが認証されている場合、コンテキストの状態にデコードされたトークンとユーザーIDをcontextにセットします
 */
export const authenticator: Koa.Middleware = async (ctx: AppContext, next: Koa.Next) => {
    const validationResult = HeaderParamRequestSchema.authToken.validate(ctx.headers.authorization)
    if (validationResult.error) throw appErrorFactory(APP_ERROR_CODES.AUTH_UNAUTHORIZED)
    const idToken = validationResult.value.split('Bearer ')[1]

    const decodedToken = await admin
        .auth()
        .verifyIdToken(idToken)
        .catch((err) => {
            logger.error(err)
            throw appErrorFactory(APP_ERROR_CODES.AUTH_INVALID_TOKEN)
        })

    if (!decodedToken.email_verified) throw appErrorFactory(APP_ERROR_CODES.AUTH_EMAIL_UNVERIFIED)
    ctx.state.idToken = decodedToken
    ctx.state.uid = decodedToken.uid
    await next()
}
