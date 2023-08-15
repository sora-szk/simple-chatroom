import { APP_ERROR_CODES } from '../../constants/appErrorCodes'

export type AppErrorCode = (typeof APP_ERROR_CODES)[keyof typeof APP_ERROR_CODES]
export const isAppErrorCode = (code: number): code is AppErrorCode =>
    (Object.values(APP_ERROR_CODES) as number[]).includes(code)
