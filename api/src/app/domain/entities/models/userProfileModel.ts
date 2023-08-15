import { genderCode } from '../types/genderCode'

export interface UserProfileModel {
    uid: string
    nickname: string | null
    bio: string | null
    gender: genderCode | null
    age: number | null
    hobby: string | null
    createdAt: Date
    updatedAt: Date
}
