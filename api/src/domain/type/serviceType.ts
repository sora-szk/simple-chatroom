export const SERVICE_TYPE = {
    AUTHENTICATOR: 'authenticator',
    CHAT_ROOM: 'chatRoom',
    ROOM_MESSAGE: 'roomMessage',
    DIRECT_MESSAGE: 'directMessage',
    NOTIFICATION: 'notification',
    USER_PROFILE: 'userProfile',
    PRIVATE_USER_PROFILE: 'privateUserProfile',
    NONE: 'none',
} as const;

export type ServiceType = typeof SERVICE_TYPE[keyof typeof SERVICE_TYPE]