import { AppErrorModel } from '../domain/entities/appErrorModel'
import { AppErrorCode } from '../domain/types/appErrorCode'
import { ServiceType } from '../domain/types/serviceTypes'
import { getAppErrorDefinition } from '../constants/defineAppError'

/**
 * AppErrorコンストラクタのwrapperです。
 * - 初期値の決定や加工を担います
 */
const _createAppError = (data: {
    errorCode: AppErrorCode
    httpStatus: number
    service: ServiceType
    details: string
    userMessage?: string
    stack?: string
    at?: Date
}): AppErrorModel => {
    const { errorCode, httpStatus, service, details, userMessage, at } = data
    return new AppErrorModel(errorCode, httpStatus, service, at ?? new Date(), details, userMessage)
}

/**
 * @param requestErrorCode エラーコード
 * @param details システムエラーメッセージ
 * @param userMessage クライアントがユーザに表示するメッセージ
 */
export const appErrorFactory = (
    requestErrorCode: number,
    data: {
        details?: string
        userMessage?: string
        stack?: string
    } = {}
): AppErrorModel => {
    const { details, userMessage, stack } = data
    const { errorCode, httpStatus, service, defaultDetails, defaultUserMessage } =
        getAppErrorDefinition(requestErrorCode)
    return _createAppError({
        errorCode,
        httpStatus,
        service,
        details: details ?? defaultDetails,
        userMessage: userMessage ?? defaultUserMessage,
        stack,
    })
}
