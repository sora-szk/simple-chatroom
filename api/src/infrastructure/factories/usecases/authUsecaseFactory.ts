import { AuthRepository } from '../../../app/domain/interfaces/repository/authRepository'
import { PrivateUserProfileRepository } from '../../../app/domain/interfaces/repository/privateUserProfileRepository'
import { UserProfileRepository } from '../../../app/domain/interfaces/repository/userProfileRepository'
import { AuthUsecase } from '../../../app/domain/interfaces/usecases/authUsecase'
import { AuthInteractor } from '../../../app/interactors/authInteractor'

export const authUsecaseFactory = (
    authRepository: AuthRepository,
    userProfileRepository: UserProfileRepository,
    privateUserProfileRepository: PrivateUserProfileRepository
): AuthUsecase =>
    new AuthInteractor(authRepository, userProfileRepository, privateUserProfileRepository)
