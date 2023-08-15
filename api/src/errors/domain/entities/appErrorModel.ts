import { AppErrorCode } from '../types/appErrorCode'
import { ServiceType } from '../types/serviceTypes'

const appErrorName = 'AppErrorModel'

/**
 * middlerwareでハンドル可能なエラー形式
 * - appErrorFactory()を使用し、AppErrorを直接コンストラクトすることは避けてください
 */
export class AppErrorModel extends Error {
    constructor(
        readonly errorCode: AppErrorCode,
        readonly httpStatus: number,
        readonly service: ServiceType,
        readonly at: Date,
        readonly details: string,
        readonly userMessage?: string
    ) {
        super(
            JSON.stringify({
                name: appErrorName,
                errorCode,
                httpStatus,
                service,
                at: at.toISOString(),
                details,
                userMessage,
            })
        )
        this.name = appErrorName
    }

    toObject() {
        return {
            name: this.name,
            errorCode: this.errorCode,
            httpStatus: this.httpStatus,
            service: this.service,
            at: this.at.toISOString(),
            details: this.details,
            userMessage: this.userMessage,
            stack: this.stack,
        }
    }

    toString(): string {
        return JSON.stringify(this.toObject())
    }
}
