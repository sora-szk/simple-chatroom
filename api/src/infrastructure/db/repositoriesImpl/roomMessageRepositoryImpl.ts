import { RoomMessageModel } from '../../../app/domain/entities/models/roomMessageModel'
import { RoomMessageRepository } from '../../../app/domain/interfaces/repository/roomMessageRepository'
import { RoomMessageDatastore } from '../firestore/datastore/roomMessageDatastore'

export class RoomMessageRepositoryImpl implements RoomMessageRepository {
    constructor(private datastore: RoomMessageDatastore) {}

    async create(
        data: Omit<
            RoomMessageModel,
            'roomMessageDocID' | 'roomMessageID' | 'createdAt' | 'updatedAt'
        >
    ): Promise<void> {
        return this.datastore.create(data)
    }

    async get(roomMessageID: string): Promise<RoomMessageModel | null> {
        return this.datastore.get(roomMessageID)
    }

    async getList(
        roomID: string,
        data: { fromMessageID?: number; toMessageID?: number }
    ): Promise<RoomMessageModel[]> {
        return this.datastore.getList(roomID, data)
    }
}
