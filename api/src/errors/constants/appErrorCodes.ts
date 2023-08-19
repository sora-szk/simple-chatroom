/// 以下の3要素を結合する
/// - HttpStatus: 3桁
/// - ServiceCode: 2桁
///     - SERVICE_CODESのindex
/// - ID: 2桁
///     - 1始まりでインクリメント
export const APP_ERROR_CODES = {
    // 400
    BAD_REQUEST: 4000001,
    // 401
    AUTH_UNAUTHORIZED: 4010101,
    AUTH_INVALID_TOKEN: 4010102,
    AUTH_EMAIL_UNVERIFIED: 4010103,
    // 403
    FORBIDDEN: 4030001,
    AUTH_FORBIDDEN: 4030101,
    CHAT_ROOM_FORBIDDEN_OPERATION: 4030201,
    CHAT_ROOM_WHITELIST_NOT_FOUND: 4030202,
    ROOM_MESSAGE_FORBIDDEN_POST: 4030301,
    ROOM_MESSAGE_FORBIDDEN_VIEW: 4030302,
    // 404
    NOT_FOUND: 4040001,
    AUTH_USER_NOT_FOUND: 4040101,
    CHAT_ROOM_NOT_FOUND: 4040201,
    // 408
    REQUEST_TIMEOUT: 4080001,
    // 409
    ALREADY_EXIST: 4090001,
    ABORT_REQUST: 4090002,
    AUTH_EMAIL_CONFLICT: 4090103,
    // 412
    PRECONDITION_FAILED: 4120001,
    // 422
    INVALID_INPUT: 4220001,
    AUTH_INVALID_INPUT: 4220101,
    // 429
    TOO_MANY_REQUEST: 4290001,
    // 500
    INTERNAL_SERVER_ERROR: 5000001,
    DB_ACCESS_CANCELED: 5000002,
    // 501
    NOT_IMPLEMENTED: 5010001,
    // 503
    SERVICE_UNAVAILABLE: 5030001,
} as const

export const DEFAULT_ERROR_CODE = APP_ERROR_CODES.INTERNAL_SERVER_ERROR
