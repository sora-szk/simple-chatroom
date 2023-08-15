import { PrivateUserProfileModel } from '../../../app/domain/entities/models/privateUserProfileModel'
import { PrivateUserProfileRepository } from '../../../app/domain/interfaces/repository/privateUserProfileRepository'
import { PrivateUserProfileDatastore } from '../firestore/datastore/privateUserProfileDatastore'

export class PrivateUserProfileRepositoryImpl implements PrivateUserProfileRepository {
    constructor(private datastore: PrivateUserProfileDatastore) {}

    async create(
        uid: string,
        data: Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>
    ): Promise<void> {
        return this.datastore.create(uid, data)
    }

    async update(
        uid: string,
        data: Partial<Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>
    ): Promise<void> {
        return this.datastore.update(uid, data)
    }

    async get(uid: string): Promise<PrivateUserProfileModel | null> {
        return this.datastore.get(uid)
    }
}
