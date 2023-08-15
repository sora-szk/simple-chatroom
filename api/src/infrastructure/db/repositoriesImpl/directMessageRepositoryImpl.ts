import { DirectMessageModel } from '../../../app/domain/entities/models/directMessageModel'
import { DirectMessageRepository } from '../../../app/domain/interfaces/repository/directMessageRepository'
import { DirectMessageDatastore } from '../firestore/datastore/directMessageDatastore'

export class DirectMessageRepositoryImpl implements DirectMessageRepository {
    constructor(private directMessageDatastore: DirectMessageDatastore) {}

    async create(
        data: Omit<
            DirectMessageModel,
            'directMessageDocID' | 'directMessageID' | 'createdAt' | 'updatedAt'
        >
    ): Promise<void> {
        return this.directMessageDatastore.create(data)
    }

    async get(directMessageDocID: string): Promise<DirectMessageModel | null> {
        return this.directMessageDatastore.get(directMessageDocID)
    }

    async getList(data: {
        uid1: string
        uid2: string
        fromMessageID?: number
        toMessageID?: number
    }): Promise<DirectMessageModel[]> {
        return this.directMessageDatastore.getList(data)
    }
}
