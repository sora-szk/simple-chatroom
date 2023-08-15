import { ChatRoomModel } from '../../domain/entities/models/chatRoomModel'

export const hasRoomAccess = (room: ChatRoomModel, uid: string): boolean => {
    if (room.blackList.includes(uid)) return false
    if (room.organizer === uid) return true
    if (room.editorList.includes(uid)) return true
    // NOTE: whiteListが存在しない場合、誰でもアクセス可能
    if (room.whiteList === null) return true
    if (room.whiteList.includes(uid)) return true
    return false
}
