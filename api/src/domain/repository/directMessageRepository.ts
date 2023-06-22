import { DirectMessageModel } from "../model/directMessageModel";

export interface DirectMessageRepository {
    create(data: Omit<DirectMessageModel, 'directMessageDocID' | 'directMessageID' | 'createdAt' | 'updatedAt'>): Promise<void>;
    get(directMessageDocID: string): Promise<DirectMessageModel | null>;
    getList(uid1: string, uid2: string, fromMessageID?: number, toMessageID?: number): Promise<DirectMessageModel[]>;
}
