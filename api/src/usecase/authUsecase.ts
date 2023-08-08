import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { createAppError } from '../domain/appError'
import { AuthRepository } from '../domain/repository/authRepository'
import { PrivateUserProfileRepository } from '../domain/repository/privateUserProfileRepository'
import { UserProfileRepository } from '../domain/repository/userProfileRepository'
import { createAuthDatastore } from '../infrastructure/datastore/authDatastore'
import { createPrivateUserProfileDatastore } from '../infrastructure/datastore/privateUserProfileDatastore'
import { createUserProfileDatastore } from '../infrastructure/datastore/userProfileDatastore'

export interface AuthUsecase {
    /**
     * - 新規ユーザアカウント・プロファイル仮作成、認証メール発行を行う
     * - メール認証が成功したら、アカウント作成は完了となる
     */
    signup(email: string, password: string): Promise<void>
    getUser(uid: string): Promise<UserRecord | null>
}

export const createAuthUsecase = (
    authRepository?: AuthRepository,
    userProfileRepository?: UserProfileRepository,
    privateUserProfileRepository?: PrivateUserProfileRepository
): AuthUsecase => {
    const _authRepository = authRepository ?? createAuthDatastore()
    const _userProfileRepository = userProfileRepository ?? createUserProfileDatastore()
    const _privateUserProfileRepository = privateUserProfileRepository ?? createPrivateUserProfileDatastore()
    return new AuthUsecaseImpl(_authRepository, _userProfileRepository, _privateUserProfileRepository)
}

export class AuthUsecaseImpl implements AuthUsecase {
    constructor(
        private authRepository: AuthRepository,
        private userProfileRepository: UserProfileRepository,
        private privateUserProfileRepository: PrivateUserProfileRepository
    ) {}

    async signup(email: string, password: string): Promise<void> {
        await this.authRepository.createUser(email, password)
        const user = await this.authRepository.getUserByEmail(email)
        if (!user) throw createAppError(500001)
        await this.privateUserProfileRepository.create(user.uid, { email: email })
        await this.userProfileRepository.create(user.uid, {
            nickname: null,
            bio: null,
            gender: null,
            age: null,
            hobby: null,
        })
    }

    async getUser(uid: string): Promise<UserRecord | null> {
        return this.authRepository.getUser(uid)
    }
}
