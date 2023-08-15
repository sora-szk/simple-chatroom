import { PrivateUserProfileRepository } from '../../../app/domain/interfaces/repository/privateUserProfileRepository'
import { PrivateUserProfileUsecase } from '../../../app/domain/interfaces/usecases/privateUserProfileUsecase'
import { PrivateUserProfileInteractor } from '../../../app/interactors/privateUserProfileInteractor'

export const privateUserProfileUsecaseFactory = (
    privateUserProfileRepository: PrivateUserProfileRepository
): PrivateUserProfileUsecase => new PrivateUserProfileInteractor(privateUserProfileRepository)
