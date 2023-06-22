import { RoomMessageModel } from "../model/roomMessageModel";

export interface RoomMessageRepository {
    create(data: Omit<RoomMessageModel, 'roomMessageDocID' | 'roomMessageID' | 'createdAt' | 'updatedAt'>): Promise<void>;
    get(roomMessageID: string): Promise<RoomMessageModel | null>;
    getList(roomID: string, fromMessageID?: number, toMessageID?: number): Promise<RoomMessageModel[]>;
}