import { AppErrorDefinition } from '../domain/types/appErrorDefinition'
import { isAppErrorCode } from '../domain/types/appErrorCode'
import { APP_ERROR_CODES, DEFAULT_ERROR_CODE } from './appErrorCodes'
import { SERVICE_CODES } from './serviceCodes'

export const DEFINE_APP_ERRORS: Record<number, AppErrorDefinition> = {
    // 400
    [APP_ERROR_CODES.BAD_REQUEST]: {
        errorCode: APP_ERROR_CODES.BAD_REQUEST,
        httpStatus: 400,
        service: SERVICE_CODES.NONE,
        defaultDetails: 'Missing request body.',
        defaultUserMessage: 'リクエストボディが不正です',
    },
    // 401
    [APP_ERROR_CODES.AUTH_UNAUTHORIZED]: {
        errorCode: APP_ERROR_CODES.AUTH_UNAUTHORIZED,
        httpStatus: 401,
        service: SERVICE_CODES.AUTHENTICATOR,
        defaultDetails: 'Authentication failed. User is not logged in.',
        defaultUserMessage:
            '未認証エラーが発生しました\n該当サービスのご利用にはログインが必要です',
    },
    [APP_ERROR_CODES.AUTH_INVALID_TOKEN]: {
        errorCode: APP_ERROR_CODES.AUTH_INVALID_TOKEN,
        httpStatus: 401,
        service: SERVICE_CODES.AUTHENTICATOR,
        defaultDetails: 'Authentication error. Token might be invalid.',
        defaultUserMessage: '認証エラーが発生しました',
    },
    [APP_ERROR_CODES.AUTH_EMAIL_UNVERIFIED]: {
        errorCode: APP_ERROR_CODES.AUTH_EMAIL_UNVERIFIED,
        httpStatus: 401,
        service: SERVICE_CODES.AUTHENTICATOR,
        defaultDetails: "User's email address has not been verified.",
        defaultUserMessage: 'メールアドレスの本人認証が必要です',
    },
    //403
    [APP_ERROR_CODES.FORBIDDEN]: {
        errorCode: APP_ERROR_CODES.FORBIDDEN,
        httpStatus: 403,
        service: SERVICE_CODES.NONE,
        defaultDetails: 'User does not have permission to access this resource.',
        defaultUserMessage: '指定リソースへのアクセス権限がありません',
    },
    [APP_ERROR_CODES.AUTH_FORBIDDEN]: {
        errorCode: APP_ERROR_CODES.AUTH_FORBIDDEN,
        httpStatus: 403,
        service: SERVICE_CODES.AUTHENTICATOR,
        defaultDetails: 'User does not have permission to access this resource.',
        defaultUserMessage: '指定リソースへのアクセス権限がありません',
    },
    [APP_ERROR_CODES.CHAT_ROOM_FORBIDDEN_OPERATION]: {
        errorCode: APP_ERROR_CODES.CHAT_ROOM_FORBIDDEN_OPERATION,
        httpStatus: 403,
        service: SERVICE_CODES.CHAT_ROOM,
        defaultDetails: 'User lacks permission to perform this chat room operation.',
        defaultUserMessage: '指定したチャットルームの操作権限がありません',
    },
    [APP_ERROR_CODES.CHAT_ROOM_WHITELIST_NOT_FOUND]: {
        errorCode: APP_ERROR_CODES.CHAT_ROOM_WHITELIST_NOT_FOUND,
        httpStatus: 403,
        service: SERVICE_CODES.CHAT_ROOM,
        defaultDetails: 'No whitelist found for the specified chat room.',
        defaultUserMessage: '指定したチャットルームのホワイトリストは存在しません',
    },
    [APP_ERROR_CODES.ROOM_MESSAGE_FORBIDDEN_POST]: {
        errorCode: APP_ERROR_CODES.ROOM_MESSAGE_FORBIDDEN_POST,
        httpStatus: 403,
        service: SERVICE_CODES.ROOM_MESSAGE,
        defaultDetails: 'User does not have permission to post in the specified chat room.',
        defaultUserMessage: '指定したチャットルームへの投稿権限がありません',
    },
    [APP_ERROR_CODES.ROOM_MESSAGE_FORBIDDEN_VIEW]: {
        errorCode: APP_ERROR_CODES.ROOM_MESSAGE_FORBIDDEN_VIEW,
        httpStatus: 403,
        service: SERVICE_CODES.ROOM_MESSAGE,
        defaultDetails:
            'User does not have permission to view messages in the specified chat room.',
        defaultUserMessage: '指定したチャットルームの閲覧権限がありません',
    },
    // 404
    [APP_ERROR_CODES.NOT_FOUND]: {
        errorCode: APP_ERROR_CODES.NOT_FOUND,
        httpStatus: 404,
        service: SERVICE_CODES.AUTHENTICATOR,
        defaultDetails: 'No resource found.',
        defaultUserMessage: '該当リソースは存在しません',
    },
    [APP_ERROR_CODES.AUTH_USER_NOT_FOUND]: {
        errorCode: APP_ERROR_CODES.AUTH_USER_NOT_FOUND,
        httpStatus: 404,
        service: SERVICE_CODES.AUTHENTICATOR,
        defaultDetails: 'No user found with the specified credentials.',
        defaultUserMessage: '該当ユーザは存在しません',
    },
    [APP_ERROR_CODES.CHAT_ROOM_NOT_FOUND]: {
        errorCode: APP_ERROR_CODES.CHAT_ROOM_NOT_FOUND,
        httpStatus: 404,
        service: SERVICE_CODES.CHAT_ROOM,
        defaultDetails: 'Chat room not found.',
        defaultUserMessage: '指定したチャットルームは存在しません',
    },
    // 408
    [APP_ERROR_CODES.REQUEST_TIMEOUT]: {
        errorCode: APP_ERROR_CODES.REQUEST_TIMEOUT,
        httpStatus: 408,
        service: SERVICE_CODES.NONE,
        defaultDetails: 'The operation timed out.',
        defaultUserMessage: 'しばらく時間を置いてから再度お試しください',
    },
    // 409
    [APP_ERROR_CODES.ALREADY_EXIST]: {
        errorCode: APP_ERROR_CODES.ALREADY_EXIST,
        httpStatus: 409,
        service: SERVICE_CODES.NONE,
        defaultDetails: 'The resource is already exists.',
        defaultUserMessage: '既に登録されているリソースです',
    },
    [APP_ERROR_CODES.ABORT_REQUST]: {
        errorCode: APP_ERROR_CODES.ABORT_REQUST,
        httpStatus: 409,
        service: SERVICE_CODES.NONE,
        defaultDetails: 'The operation was aborted.',
        defaultUserMessage: 'しばらく時間を置いてから再度お試しください',
    },
    [APP_ERROR_CODES.AUTH_EMAIL_CONFLICT]: {
        errorCode: APP_ERROR_CODES.AUTH_EMAIL_CONFLICT,
        httpStatus: 409,
        service: SERVICE_CODES.AUTHENTICATOR,
        defaultDetails: 'Email address is already registered.',
        defaultUserMessage: '既に登録されているメールアドレスです',
    },
    // 412
    [APP_ERROR_CODES.PRECONDITION_FAILED]: {
        errorCode: APP_ERROR_CODES.PRECONDITION_FAILED,
        httpStatus: 412,
        service: SERVICE_CODES.NONE,
        defaultDetails: 'The required conditions for the request were not met.',
        defaultUserMessage: '要求の前提条件が満たされていません',
    },
    // 422
    [APP_ERROR_CODES.INVALID_INPUT]: {
        errorCode: APP_ERROR_CODES.INVALID_INPUT,
        httpStatus: 422,
        service: SERVICE_CODES.NONE,
        defaultDetails: 'Invalid input received.',
        defaultUserMessage: '入力値が不正です',
    },
    [APP_ERROR_CODES.AUTH_INVALID_INPUT]: {
        errorCode: APP_ERROR_CODES.AUTH_INVALID_INPUT,
        httpStatus: 422,
        service: SERVICE_CODES.AUTHENTICATOR,
        defaultDetails: 'Invalid input received.',
        defaultUserMessage: '入力値が不正です',
    },
    // 429
    [APP_ERROR_CODES.TOO_MANY_REQUEST]: {
        errorCode: APP_ERROR_CODES.TOO_MANY_REQUEST,
        httpStatus: 422,
        service: SERVICE_CODES.AUTHENTICATOR,
        defaultDetails: 'The user has sent too many requests in a given amount of time.',
        defaultUserMessage: 'しばらく時間を置いてから再度お試しください',
    },
    // 500
    [APP_ERROR_CODES.INTERNAL_SERVER_ERROR]: {
        errorCode: APP_ERROR_CODES.INTERNAL_SERVER_ERROR,
        httpStatus: 500,
        service: SERVICE_CODES.NONE,
        defaultDetails: 'Unhandled error.',
        defaultUserMessage:
            '不明なエラーが発生しました\nしばらく時間を置いてから再度お試しください',
    },
    [APP_ERROR_CODES.DB_ACCESS_CANCELED]: {
        errorCode: APP_ERROR_CODES.DB_ACCESS_CANCELED,
        httpStatus: 500,
        service: SERVICE_CODES.NONE,
        defaultDetails: 'Database access operation was cancelled unexpectedly.',
        defaultUserMessage:
            '予期せぬエラーが発生しました\nしばらく時間を置いてから再度お試しください',
    },
    // 501
    [APP_ERROR_CODES.NOT_IMPLEMENTED]: {
        errorCode: APP_ERROR_CODES.NOT_IMPLEMENTED,
        httpStatus: 501,
        service: SERVICE_CODES.NONE,
        defaultDetails:
            'The server does not support the functionality required to fulfill the request.',
        defaultUserMessage: '該当リクエストをサポートしていません',
    },
    // 503
    [APP_ERROR_CODES.SERVICE_UNAVAILABLE]: {
        errorCode: APP_ERROR_CODES.SERVICE_UNAVAILABLE,
        httpStatus: 503,
        service: SERVICE_CODES.NONE,
        defaultDetails:
            'The server is currently unable to handle the request due to maintenance or overload.',
        defaultUserMessage: 'メンテナンスまたは過負荷のためリクエストを処理できません',
    },
} as const

/**
 * 指定値に対応するエラー定義を返却します。
 * @param errorCode エラーコード
 * @returns errorCodeに対応するエラー定義
 */
export const getAppErrorDefinition = (errorCode: number): AppErrorDefinition => {
    if (isAppErrorCode(errorCode)) return DEFINE_APP_ERRORS[errorCode]
    return DEFINE_APP_ERRORS[DEFAULT_ERROR_CODE]
}
