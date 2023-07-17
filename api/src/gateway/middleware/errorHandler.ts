import Koa from 'koa';
import { AppError } from "../../domain/appError";
import { SERVICE_TYPE } from '../../domain/type/serviceType';
import { logger } from "../../share/logger";

export const errorHandler: Koa.Middleware = async (ctx: Koa.Context, next: Koa.Next) => {
    await next().catch((e) => {
        let appError: AppError | undefined;
        if (e instanceof AppError) appError = e;
        else {
            appError = new AppError(
                500001,
                500,
                SERVICE_TYPE.NONE,
                '不明なエラーが発生しました\nしばらくお待ちいただき、再度お試しください',
                'Unhandled error.',
                e?.stack,
            )
        }

        logger.error(appError)
        const errorObject = appError.toObject()
        errorObject.stack = undefined
        ctx.body = {
            error: appError.toObject()
        }
    })
};