import { UserProfileModel } from '../../domain/model/userProfileModel'

export const detail = (source: UserProfileModel): any => {
    return {
        uid: source.uid,
        nickname: source.nickname,
        bio: source.bio,
        gender: source.gender,
        age: source.age,
        hobby: source.hobby,
        created_at: source.createdAt.toISOString(),
        updated_at: source.updatedAt.toISOString(),
    }
}
