import { UserProfilePresentModel } from '../../../app/adapters/response/models/userProfilePresentModel'
import { UserProfilePresenter } from '../../../app/adapters/response/presenters/userProfilePresenter'
import { UserProfileModel } from '../../../app/domain/entities/models/userProfileModel'

export class UserProfilePresenterImpl implements UserProfilePresenter {
    detail(source: UserProfileModel | null): UserProfilePresentModel | null {
        return source
            ? {
                  uid: source.uid,
                  nickname: source.nickname,
                  bio: source.bio,
                  gender: source.gender,
                  age: source.age,
                  hobby: source.hobby,
                  created_at: source.createdAt.toISOString(),
                  updated_at: source.updatedAt.toISOString(),
              }
            : null
    }
}
