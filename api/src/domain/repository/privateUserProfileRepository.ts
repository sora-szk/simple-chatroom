import { PrivateUserProfileModel } from '../model/privateUserProfileModel'

export interface PrivateUserProfileRepository {
    create(uid: string, data: Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>): Promise<void>
    update(uid: string, data: Partial<Omit<PrivateUserProfileModel, 'uid' | 'createdAt' | 'updatedAt'>>): Promise<void>
    get(uid: string): Promise<PrivateUserProfileModel | null>
}
