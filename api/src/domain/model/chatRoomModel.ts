export interface ChatRoomModel {
    roomID: string
    name: string
    organizer: string
    editorList: string[]
    whiteList: string[] | null
    blackList: string[]
    createdAt: Date
    updatedAt: Date
}
