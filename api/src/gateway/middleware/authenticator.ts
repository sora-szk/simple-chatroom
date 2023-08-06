import Koa from 'koa'
import admin from 'firebase-admin'
import { createAppError } from '../../domain/appError'
import { logger } from '../../share/logger'

export const authenticator: Koa.Middleware = async (ctx: Koa.Context, next: Koa.Next) => {
    const idToken = ctx.headers.authorization?.split('Bearer ')[1]
    if (!idToken) throw createAppError(401001)
    const decodedToken = await admin
        .auth()
        .verifyIdToken(idToken)
        .catch((err) => {
            logger.error(err)
            throw createAppError(401002)
        })
    ctx.state.idToken = decodedToken
    ctx.state.uid = decodedToken.uid
    await next()
}
