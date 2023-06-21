import { ChatRoomModel } from "../model/chatRoomModel";

export interface ChatRoomRepository {
    create(data: Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>): Promise<void>;
    update(roomID: string, data: Partial<Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>>): Promise<void>;
    join(roomID: string, uid: string): Promise<void>;
    invite(roomID: string, uid: string): Promise<void>;
    expal(roomID: string, uid: string): Promise<void>;
    getDetail(roomID: string): Promise<ChatRoomModel | null>;
    getList(): Promise<Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'>[]>;
}
