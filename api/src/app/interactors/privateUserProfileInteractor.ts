import { PrivateUserProfileModel } from '../domain/entities/models/privateUserProfileModel'
import { PrivateUserProfileRepository } from '../domain/interfaces/repository/privateUserProfileRepository'
import { PrivateUserProfileUsecase } from '../domain/interfaces/usecases/privateUserProfileUsecase'

export class PrivateUserProfileInteractor implements PrivateUserProfileUsecase {
    constructor(private privateUserProfileRepository: PrivateUserProfileRepository) {}

    async create(
        uid: string,
        data: Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>
    ): Promise<void> {
        return this.privateUserProfileRepository.create(uid, data)
    }

    async update(
        uid: string,
        data: Partial<Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>
    ): Promise<void> {
        return this.privateUserProfileRepository.update(uid, data)
    }

    async get(uid: string): Promise<PrivateUserProfileModel | null> {
        return this.privateUserProfileRepository.get(uid)
    }
}
