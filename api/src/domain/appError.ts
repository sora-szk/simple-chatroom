import { SERVICE_TYPE, ServiceType } from "./type/serviceType";

export class AppError {
    readonly code: number;
    readonly httpStatus: number;
    readonly service: ServiceType;
    readonly details: string;
    readonly userMessage: string | null;
    readonly at: Date;
    readonly stack?: string;

    constructor(
        code: number,
        httpStatus: number,
        service: ServiceType,
        userMessage: string | null,
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
        return new Error(this.userMessage ?? '');
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

export const createAppError = (code: number, details?: string, userMessage?: string): AppError => {
    switch (code) {
        case 400001:
            return new AppError(code, 400, SERVICE_TYPE.NONE, userMessage ?? null, details ?? 'RequestBody is requied.')
        case 401001:
            return new AppError(code, 401, SERVICE_TYPE.AUTHENTICATOR, userMessage ?? '未認証エラーが発生しました\n該当サービスのご利用にはログインが必要です', details ?? 'Not authorized.');
        case 401002:
            return new AppError(code, 401, SERVICE_TYPE.AUTHENTICATOR,userMessage ?? '認証エラーが発生しました', details ?? 'Failed to verify ID Token.');
        case 403001:
            return new AppError(code, 403, SERVICE_TYPE.AUTHENTICATOR, userMessage ?? null, details ?? 'Access denied.');
        case 403101:
            return new AppError(code, 403, SERVICE_TYPE.CHAT_ROOM, userMessage ?? '指定したチャットルームへの操作権限がありません', details ?? 'You do not have permission to access the specified chat room.');
        case 403102:
            return new AppError(code, 403, SERVICE_TYPE.CHAT_ROOM, userMessage ?? '指定したチャットルームのホワイトリストは存在しません', details ?? 'The whitelist for the specified chat room cannot be set.');
        case 403201:
            return new AppError(code, 403, SERVICE_TYPE.ROOM_MESSAGE,userMessage ?? '指定したチャットルームへの投稿権限がありません', details ?? 'You do not have permission to post to the specified chat room.');
        case 403202:
            return new AppError(code, 403, SERVICE_TYPE.ROOM_MESSAGE, userMessage ?? '指定したチャットルームの閲覧権限がありません', details ?? 'You do not have viewing permissions for the specified chat room.');
        case 404101:
            return new AppError(code, 404, SERVICE_TYPE.CHAT_ROOM, userMessage ??'指定したチャットルームは存在しません', details ?? 'The specified chat room does not exist.'); 
        default:
            return new AppError(500001, 500, SERVICE_TYPE.NONE, userMessage ?? '不明なエラーが発生しました\nしばらくお待ちいただき、再度お試しください', details ?? 'Unhandled error.')
    }
}