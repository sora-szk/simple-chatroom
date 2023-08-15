import { UserProfileRepository } from '../../../app/domain/interfaces/repository/userProfileRepository'
import { UserProfileUsecase } from '../../../app/domain/interfaces/usecases/userProfileUsecase'
import { UserProfileInteractor } from '../../../app/interactors/userProfileInteractor'

export const userProfileUsecaseFactory = (
    userProfileRepository: UserProfileRepository
): UserProfileUsecase => new UserProfileInteractor(userProfileRepository)
