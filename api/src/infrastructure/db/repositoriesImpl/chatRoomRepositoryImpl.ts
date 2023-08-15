import { ChatRoomModel } from '../../../app/domain/entities/models/chatRoomModel'
import { ChatRoomRepository } from '../../../app/domain/interfaces/repository/chatRoomRepository'
import { ChatRoomDatastore } from '../firestore/datastore/chatRoomDatastore'

export class ChatRoomRepositoryImpl implements ChatRoomRepository {
    constructor(private chatRoomDatastore: ChatRoomDatastore) {}

    async create(
        data: Omit<ChatRoomModel, 'createdAt' | 'updatedAt' | 'roomID'>
    ): Promise<{ roomID: string }> {
        return this.chatRoomDatastore.create(data)
    }

    async update(
        roomID: string,
        data: Partial<Omit<ChatRoomModel, 'createdAt' | 'updatedAt' | 'roomID'>>
    ): Promise<void> {
        return this.chatRoomDatastore.update(roomID, data)
    }

    async inviteEditor(roomID: string, data: { uid: string }): Promise<void> {
        return this.chatRoomDatastore.inviteEditor(roomID, data)
    }

    async invite(roomID: string, data: { uid: string }): Promise<void> {
        return this.chatRoomDatastore.invite(roomID, data)
    }

    async expel(roomID: string, data: { uid: string }): Promise<void> {
        return this.chatRoomDatastore.expel(roomID, data)
    }

    async getDetail(roomID: string): Promise<ChatRoomModel | null> {
        return this.chatRoomDatastore.getDetail(roomID)
    }

    async getList(): Promise<ChatRoomModel[]> {
        return this.chatRoomDatastore.getList()
    }
}
