export interface RoomMessagePresentModel {
    room_message_doc_id: string
    room_message_id: number
    room_id: string
    sender: string
    text: string | null
    image: string | null
    created_at: string
    updated_at: string
}
