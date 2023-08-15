import { UserRecord } from 'firebase-admin/lib/auth/user-record'

export interface AuthRepository {
    createUser(data: { email: string; password: string }): Promise<void>
    getUser(uid: string): Promise<UserRecord | null>
    getUserByEmail(email: string): Promise<UserRecord | null>
}
