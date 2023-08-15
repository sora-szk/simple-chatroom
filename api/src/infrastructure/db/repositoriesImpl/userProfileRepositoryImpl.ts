import { UserProfileModel } from '../../../app/domain/entities/models/userProfileModel'
import { UserProfileRepository } from '../../../app/domain/interfaces/repository/userProfileRepository'
import { UserProfileDatastore } from '../firestore/datastore/userProfileDatastore'

export class UserProfileRepositoryImpl implements UserProfileRepository {
    constructor(private datastore: UserProfileDatastore) {}

    async create(
        uid: string,
        data: Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>
    ): Promise<void> {
        return this.datastore.create(uid, data)
    }

    async update(
        uid: string,
        data: Partial<Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>
    ): Promise<void> {
        return this.datastore.update(uid, data)
    }

    async get(uid: string): Promise<UserProfileModel | null> {
        return this.datastore.get(uid)
    }
}
