import { AppErrorCode } from './appErrorCode'
import { ServiceType } from './serviceTypes'

export type AppErrorDefinition = {
    errorCode: AppErrorCode
    httpStatus: number
    service: ServiceType
    defaultDetails: string
    defaultUserMessage: string | undefined
}
