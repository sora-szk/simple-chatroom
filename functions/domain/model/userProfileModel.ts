export interface UserProfileModel {
    uid: string;
    nickname: string | null;
    bio: string | null;
    gender: 'men' | 'women' | 'other' | null;
    age: number | null;
    hobby: string | null;
    createdAt: Date;
    updatedAt: Date;
}  