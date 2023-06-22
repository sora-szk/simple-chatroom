import { SERVICE_TYPE, ServiceType } from "./type/serviceType";

export class AppError {
    readonly code: number;
    readonly httpStatus: number;
    readonly service: ServiceType;
    readonly details: string;
    readonly userMessage: string;
    readonly at: Date;
    readonly stack?: string;

    constructor(
        code: number,
        httpStatus: number,
        service: ServiceType,
        userMessage: string,
        details: string,
        stack?: string,
        at?: Date,
    ) {
        this.code = code;
        this.httpStatus = httpStatus;
        this.service = service;
        this.details = details;
        this.userMessage = userMessage;
        this.stack = stack;
        this.at = at ?? new Date();
    }

    toError() {
        return new Error(this.userMessage);
    }
    toObject() {
        return {
            code: this.code,
            httpStatus: this.httpStatus,
            service: this.service,
            userMessage: this.userMessage,
            details: this.details,
            stack: this.stack,
            at: this.at.toISOString(),
        };
    }
    toString() {
        return JSON.stringify(this.toObject());
    }
}

export const createAppError = (code: number): AppError => {
    switch (code) {
        case 401001:
            return new AppError(401001, 401, SERVICE_TYPE.AUTHENTICATOR, '未認証エラーが発生しました\n該当サービスのご利用にはログインが必要です', 'Not authorized.');
        case 401002:
            return new AppError(401002, 401, SERVICE_TYPE.AUTHENTICATOR, '認証エラーが発生しました', 'Failed to verify ID Token.');
        default:
            return new AppError(500001, 500, SERVICE_TYPE.NONE, '不明なエラーが発生しました\nしばらくお待ちいただき、再度お試しください', 'Unhandled error.')
    }
}