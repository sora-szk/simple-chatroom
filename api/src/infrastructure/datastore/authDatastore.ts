import * as admin from 'firebase-admin'
import { AuthRepository } from '../../domain/repository/authRepository'
import { createAppError } from '../../domain/appError'
import { UserRecord } from 'firebase-admin/lib/auth/user-record'

export const createAuthDatastore = (): AuthRepository => new AuthDatastore()

export class AuthDatastore implements AuthRepository {
    async createUser(email: string, password: string): Promise<void> {
        await admin
            .auth()
            .createUser({
                email,
                password,
                emailVerified: false,
            })
            .catch((e) => {
                switch (e.code) {
                    case 'auth/email-already-in-use':
                        throw createAppError(409001)
                    case 'auth/invalid-email':
                        throw createAppError(400002, 'Email format is invalid.')
                    case 'auth/operation-not-allowed':
                        throw createAppError(403001, 'Email/password accounts are not enabled.')
                    case 'auth/weak-password':
                        throw createAppError(400003, 'Password is too weak.')
                    default:
                        throw createAppError(500001, 'Internal server error.')
                }
            })
    }

    async getUser(uid: string): Promise<UserRecord | null> {
        const user = await admin
            .auth()
            .getUser(uid)
            .catch((e) => {
                switch (e.code) {
                    case 'auth/user-not-found':
                        return null
                    case 'auth/invalid-email':
                        throw createAppError(400002, 'Email format is invalid.')
                    default:
                        throw createAppError(500001, 'Internal server error.')
                }
            })
        return user
    }

    async getUserByEmail(email: string): Promise<UserRecord | null> {
        const user = await admin
            .auth()
            .getUserByEmail(email)
            .catch((e) => {
                switch (e.code) {
                    case 'auth/user-not-found':
                        return null
                    case 'auth/invalid-email':
                        throw createAppError(400002, 'Email format is invalid.')
                    default:
                        throw createAppError(500001, 'Internal server error.')
                }
            })
        return user
    }
}
