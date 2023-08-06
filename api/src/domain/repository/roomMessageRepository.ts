import { RoomMessageModel } from '../model/roomMessageModel'

export interface RoomMessageRepository {
    create(data: Omit<RoomMessageModel, 'roomMessageDocID' | 'roomMessageID' | 'createdAt' | 'updatedAt'>): Promise<void>
    get(roomMessageID: string): Promise<RoomMessageModel | null>
    /**
     * fromMessageID ~ toMessageID の範囲のmessageIDを持つメッセージを取得
     * @param roomID
     * @param fromMessageID
     * @param toMessageID
     */
    getList(roomID: string, fromMessageID?: number, toMessageID?: number): Promise<RoomMessageModel[]>
}
