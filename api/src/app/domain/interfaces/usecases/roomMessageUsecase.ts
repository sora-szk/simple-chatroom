import { RoomMessageModel } from '../../entities/models/roomMessageModel'

export interface RoomMessageUsecase {
    send(
        data: Omit<
            RoomMessageModel,
            'roomMessageDocID' | 'roomMessageID' | 'createdAt' | 'updatedAt'
        >
    ): Promise<void>
    get(roomMessageID: string, data: { readerID: string }): Promise<RoomMessageModel | null>
    getList(
        roomID: string,
        data: { readerID: string; fromMessageID?: number; toMessageID?: number }
    ): Promise<RoomMessageModel[]>
}
