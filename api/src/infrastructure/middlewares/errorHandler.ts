import Koa from 'koa'
import { logger } from '../api/logger'
import { APP_ERROR_CODES } from '../../errors/constants/appErrorCodes'
import { appErrorFactory } from '../../errors/factories/appErrorFactory'
import { AppErrorModel } from '../../errors/domain/entities/appErrorModel'
import { AppContext } from '../api/types/appContext'

/**
 * エラーハンドリングを行うミドルウェアです。
 * - AppErrorインスタンスは、インスタンスのデータに従って処理されます。
 * - 上記以外は内部サーバーエラーとして処理されます。
 */
export const errorHandler: Koa.Middleware = async (ctx: AppContext, next: Koa.Next) => {
    await next().catch((e) => {
        let appError: AppErrorModel | undefined
        if (e instanceof AppErrorModel) {
            appError = e
            if (_isServerError(appError.httpStatus)) logger.error(appError)
            else logger.warn(appError)
        } else {
            logger.error(e)
            appError = appErrorFactory(APP_ERROR_CODES.INTERNAL_SERVER_ERROR)
        }

        ctx.status = appError.httpStatus
        ctx.body = {
            error: appError.toObject(),
        }
    })
}

const _isServerError = (httpStatus: number) => 500 <= httpStatus && httpStatus < 600
