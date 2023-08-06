import { RoomMessageModel } from '../../domain/model/roomMessageModel'

export const detail = (source: RoomMessageModel) => {
    return {
        room_message_doc_id: source.roomMessageDocID,
        room_message_id: source.roomMessageID,
        room_id: source.roomID,
        sender: source.sender,
        text: source.text,
        image: source.image,
        created_at: source.createdAt.toISOString(),
        updated_at: source.updatedAt.toISOString(),
    }
}

export const detailList = (sourceList: RoomMessageModel[]) => {
    return sourceList.map(detail)
}
