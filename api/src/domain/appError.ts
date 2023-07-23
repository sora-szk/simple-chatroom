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
            return new AppError(code, 401, SERVICE_TYPE.AUTHENTICATOR, '未認証エラーが発生しました\n該当サービスのご利用にはログインが必要です', 'Not authorized.');
        case 401002:
            return new AppError(code, 401, SERVICE_TYPE.AUTHENTICATOR, '認証エラーが発生しました', 'Failed to verify ID Token.');
        case 403101:
            return new AppError(code, 403, SERVICE_TYPE.CHAT_ROOM, '指定したチャットルームへの操作権限がありません', 'You do not have permission to access the specified chat room.');
        case 403102:
            return new AppError(code, 403, SERVICE_TYPE.CHAT_ROOM, '指定したチャットルームのホワイトリストは存在しません', 'The whitelist for the specified chat room cannot be set.');
        case 403201:
            return new AppError(code, 403, SERVICE_TYPE.ROOM_MESSAGE, '指定したチャットルームへの投稿権限がありません', 'You do not have permission to post to the specified chat room.');
        case 403202:
            return new AppError(code, 403, SERVICE_TYPE.ROOM_MESSAGE, '指定したチャットルームの閲覧権限がありません', 'You do not have viewing permissions for the specified chat room.');
        case 404101:
            return new AppError(code, 404, SERVICE_TYPE.CHAT_ROOM, '指定したチャットルームは存在しません', 'The specified chat room does not exist.');
        default:
            return new AppError(500001, 500, SERVICE_TYPE.NONE, '不明なエラーが発生しました\nしばらくお待ちいただき、再度お試しください', 'Unhandled error.')
    }
}