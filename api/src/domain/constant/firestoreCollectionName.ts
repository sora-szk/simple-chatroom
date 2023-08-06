export const FIRESTORE_COLLECTION_NAME = {
    CHAT_ROOMS: 'chatRooms',
    DIRECT_MESSAGES: 'directMessages',
    NOTIFICATIONS: 'notifications',
    PRIVATE_USER_PROFILES: '_userProfiles',
    USER_PROFILES: 'userProfile',
    ROOM_MESSAGES: 'roomMessages',
} as const
type FIRESTORE_COLLECTION_NAME = (typeof FIRESTORE_COLLECTION_NAME)[keyof typeof FIRESTORE_COLLECTION_NAME]
