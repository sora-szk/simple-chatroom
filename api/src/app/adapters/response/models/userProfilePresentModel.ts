import { genderCode } from '../../../domain/entities/types/genderCode'

export interface UserProfilePresentModel {
    uid: string
    nickname: string | null
    bio: string | null
    gender: genderCode | null
    age: number | null
    hobby: string | null
    created_at: string
    updated_at: string
}
