import { ChatRoomModel } from '../../domain/model/chatRoomModel'

export const createResult = (source: { roomID: string }) => {
    return {
        room_id: source.roomID,
    }
}

export const summary = (source: Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'>) => {
    return {
        room_id: source.roomID,
        name: source.name,
        created_at: source.createdAt,
    }
}
export const summaryList = (source: Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'>[]) => {
    return source.map(summary)
}

export const detail = (source: ChatRoomModel) => {
    return {
        room_id: source.roomID,
        name: source.name,
        organizer: source.organizer,
        editor_list: source.editorList,
        white_list: source.whiteList,
        black_list: source.blackList,
        created_at: source.createdAt.toISOString(),
        updated_at: source.updatedAt.toISOString(),
    }
}
