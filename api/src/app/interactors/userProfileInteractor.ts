import { UserProfileModel } from '../domain/entities/models/userProfileModel'
import { UserProfileRepository } from '../domain/interfaces/repository/userProfileRepository'
import { UserProfileUsecase } from '../domain/interfaces/usecases/userProfileUsecase'

export class UserProfileInteractor implements UserProfileUsecase {
    constructor(private userProfileRepository: UserProfileRepository) {}

    async create(
        uid: string,
        data: Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>
    ): Promise<void> {
        return this.userProfileRepository.create(uid, data)
    }

    async update(
        uid: string,
        data: Partial<Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>
    ): Promise<void> {
        return this.userProfileRepository.update(uid, data)
    }

    async get(uid: string): Promise<UserProfileModel | null> {
        return this.userProfileRepository.get(uid)
    }
}
