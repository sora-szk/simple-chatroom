import { ChatRoomModel } from "../model/chatRoomModel";

export interface ChatRoomRepository {
    create(data: Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>): Promise<void>;
    update(roomID: string, data: Partial<Omit<ChatRoomModel, 'roomID' | 'createdAt' | 'updatedAt'>>): Promise<void>;
    /**
     * 指定ユーザをメッセージ投稿可能なユーザとして招待する
     * @param roomID 
     * @param uid 
     */
    inviteEditor(roomID: string, uid: string): Promise<void>;
    /**
     * 指定ユーザをメッセージ閲覧可能なユーザとして招待する
     * @param roomID 
     * @param uid 
     */
    invite(roomID: string, uid: string): Promise<void>;
    /**
     * 指定ユーザをメッセージ投稿、閲覧ができないユーザとする
     * @param roomID 
     * @param uid 
     */
    expal(roomID: string, uid: string): Promise<void>;
    getDetail(roomID: string): Promise<ChatRoomModel | null>;
    getList(): Promise<Pick<ChatRoomModel, 'roomID' | 'name' | 'createdAt'>[]>;
}
