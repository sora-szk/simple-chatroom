import { APP_ERROR_CODES } from '../../../../../errors/constants/appErrorCodes'
import { AppErrorModel } from '../../../../../errors/domain/entities/appErrorModel'
import { appErrorFactory } from '../../../../../errors/factories/appErrorFactory'
import { logger } from '../../../../api/logger'

/**
 * Firestoreのエラーコードに基づいてAppErrorを返却します。
 */
export const convertFirestoreError = (error: { errorCode?: string }): AppErrorModel => {
    const { errorCode } = error
    if (typeof errorCode !== 'string') return appErrorFactory(APP_ERROR_CODES.INTERNAL_SERVER_ERROR)
    switch (errorCode) {
        case 'cancelled':
            return appErrorFactory(APP_ERROR_CODES.DB_ACCESS_CANCELED)
        case 'invalid-argument':
        case 'out-of-range':
            return appErrorFactory(APP_ERROR_CODES.INVALID_INPUT)
        case 'deadline-exceeded':
            return appErrorFactory(APP_ERROR_CODES.REQUEST_TIMEOUT)
        case 'not-found':
            return appErrorFactory(APP_ERROR_CODES.NOT_FOUND)
        case 'already-exists':
            return appErrorFactory(APP_ERROR_CODES.ALREADY_EXIST)
        case 'permission-denied':
            return appErrorFactory(APP_ERROR_CODES.FORBIDDEN)
        case 'resource-exhausted':
            return appErrorFactory(APP_ERROR_CODES.TOO_MANY_REQUEST)
        case 'failed-precondition':
            return appErrorFactory(APP_ERROR_CODES.PRECONDITION_FAILED)
        case 'aborted':
            return appErrorFactory(APP_ERROR_CODES.ABORT_REQUST)
        case 'unimplemented':
            return appErrorFactory(APP_ERROR_CODES.NOT_IMPLEMENTED)
        case 'unavailable':
            return appErrorFactory(APP_ERROR_CODES.SERVICE_UNAVAILABLE)
        case 'unknown':
        case 'internal':
        case 'data-loss':
        default:
            logger.error(error)
            return appErrorFactory(APP_ERROR_CODES.INTERNAL_SERVER_ERROR)
    }
}

export const handleFirestoreError = (error: { errorCode?: string }) => {
    throw convertFirestoreError(error)
}
