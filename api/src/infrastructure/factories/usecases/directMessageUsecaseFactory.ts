import { DirectMessageRepository } from '../../../app/domain/interfaces/repository/directMessageRepository'
import { DirectMessageUsecase } from '../../../app/domain/interfaces/usecases/directMessageUsecase'
import { DirectMessageInteractor } from '../../../app/interactors/directMessageInteractor'

export const directMessageUsecaseFactory = (
    directMessageRepository: DirectMessageRepository
): DirectMessageUsecase => new DirectMessageInteractor(directMessageRepository)
