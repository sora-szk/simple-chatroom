import { UserProfileModel } from '../../entities/models/userProfileModel'

export interface UserProfileUsecase {
    create(
        uid: string,
        data: Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>
    ): Promise<void>
    update(
        uid: string,
        data: Partial<Omit<UserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>
    ): Promise<void>
    get(uid: string): Promise<UserProfileModel | null>
}
