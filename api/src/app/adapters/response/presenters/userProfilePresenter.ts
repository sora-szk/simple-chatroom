import { UserProfileModel } from '../../../domain/entities/models/userProfileModel'
import { UserProfilePresentModel } from '../models/userProfilePresentModel'

export interface UserProfilePresenter {
    detail(source: UserProfileModel | null): UserProfilePresentModel | null
}
