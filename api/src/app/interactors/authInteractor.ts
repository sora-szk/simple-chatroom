import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { AuthRepository } from '../domain/interfaces/repository/authRepository'
import { AuthUsecase } from '../domain/interfaces/usecases/authUsecase'
import { UserProfileRepository } from '../domain/interfaces/repository/userProfileRepository'
import { PrivateUserProfileRepository } from '../domain/interfaces/repository/privateUserProfileRepository'
import { APP_ERROR_CODES } from '../../errors/constants/appErrorCodes'
import { appErrorFactory } from '../../errors/factories/appErrorFactory'

export class AuthInteractor implements AuthUsecase {
    constructor(
        private authRepository: AuthRepository,
        private userProfileRepository: UserProfileRepository,
        private privateUserProfileRepository: PrivateUserProfileRepository
    ) {}

    async signup(data: { email: string; password: string }): Promise<void> {
        await this.authRepository.createUser(data)
        const user = await this.authRepository.getUserByEmail(data.email)
        if (!user) {
            throw appErrorFactory(APP_ERROR_CODES.INTERNAL_SERVER_ERROR)
        }
        await this.privateUserProfileRepository.create(user.uid, { email: data.email })
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
