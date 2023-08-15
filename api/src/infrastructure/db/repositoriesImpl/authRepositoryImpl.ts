import * as admin from 'firebase-admin'
import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { AuthRepository } from '../../../app/domain/interfaces/repository/authRepository'
import { APP_ERROR_CODES } from '../../../errors/constants/appErrorCodes'
import { appErrorFactory } from '../../../errors/factories/appErrorFactory'

export class AuthRepositoryImpl implements AuthRepository {
    /// Singleton pattern
    private static instance?: AuthRepositoryImpl
    private constructor() {}
    public static getInstance(): AuthRepositoryImpl {
        if (!this.instance) {
            this.instance = new AuthRepositoryImpl()
        }
        return this.instance
    }

    async createUser(data: { email: string; password: string }): Promise<void> {
        await admin
            .auth()
            .createUser({
                ...data,
                emailVerified: false,
            })
            .catch(this._handleAuthError)
    }

    async getUser(uid: string): Promise<UserRecord | null> {
        return admin.auth().getUser(uid).catch(this._handleAuthError)
    }

    async getUserByEmail(email: string): Promise<UserRecord | null> {
        return admin.auth().getUserByEmail(email).catch(this._handleAuthError)
    }

    private _handleAuthError = (e: admin.FirebaseError) => {
        switch (e.code) {
            case 'auth/email-already-in-use':
                throw appErrorFactory(APP_ERROR_CODES.AUTH_EMAIL_CONFLICT)
            case 'auth/invalid-email':
                throw appErrorFactory(APP_ERROR_CODES.AUTH_INVALID_INPUT, {
                    details: 'Email format is invalid.',
                    userMessage: 'Eメールアドレスの形式が不正です',
                })
            case 'auth/operation-not-allowed':
                throw appErrorFactory(APP_ERROR_CODES.AUTH_FORBIDDEN)
            case 'auth/weak-password':
                throw appErrorFactory(APP_ERROR_CODES.AUTH_INVALID_INPUT, {
                    details: 'Password is too weak.',
                    userMessage: 'パスワードが脆弱です\n再設定をお願いいたします',
                })
            default:
                throw appErrorFactory(APP_ERROR_CODES.INTERNAL_SERVER_ERROR)
        }
    }
}
