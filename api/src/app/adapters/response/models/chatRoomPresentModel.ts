export interface ChatRoomCreateResultPresentModel {
    room_id: string
}

export interface ChatRoomSummaryPresentModel {
    room_id: string
    name: string
    created_at: string
}

export interface ChatRoomPresentModel {
    room_id: string
    name: string
    organizer: string
    editor_list: string[]
    white_list: string[] | null
    black_list: string[]
    created_at: string
    updated_at: string
}
